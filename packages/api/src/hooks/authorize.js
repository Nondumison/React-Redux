// @flow strict

import { rulesToQuery } from '@casl/ability/extra';
import { Forbidden } from '@feathersjs/errors';

import roleConfig from '../roles.config';

import type { Context } from 'types/feathers.types';

const TYPE_KEY = Symbol.for('type');

const ruleToQuery = rule => {
	if (JSON.stringify(rule.conditions).includes('"$all":')) {
		throw new Error('Sequelize does not support "$all" operator');
	}
	return rule.inverted != null ? { $not: rule.conditions } : rule.conditions;
};

export default async (context: Context) => {
	const {
		app,
		method,
		service,
		path: name,
		params: { user },
	} = context;

	const ability = await roleConfig(app).allocateAbilitiesToRole(user);

	const throwUnlessCan = (action, resource) => {
		if (ability.cannot(action, resource)) {
			throw new Forbidden(`You are not allowed to ${action} ${name}`);
		}
	};

	if (method === 'create') {
		throwUnlessCan('create', name);
		return context;
	}

	if (method === 'find') {
		// TODO: check that rulesToQuery takes into userId ownership, or other
		// permission conditions.
		const query = rulesToQuery(ability, method, name, ruleToQuery);
		if (query != null) {
			Object.assign(context.params.query, query);
		}
		return context;
	}

	const params = { ...context.params, provider: null };
	const result = await service.get(context.id, params);

	result[TYPE_KEY] = name;
	throwUnlessCan(method, result);

	return context;
};
