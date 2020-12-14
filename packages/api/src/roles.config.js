// @flow strict

import { AbilityBuilder, Ability } from '@casl/ability';

import type { App } from './types/feathers.types';
import type { UserType } from './types/entity.types';

type Can = (
	action: string | Array<string>,
	subject: string,
	conditions?: {| id?: string, organisationId?: string, userId?: string |},
) => RuleBuilder;

const TYPE_KEY = Symbol.for('type');

Ability.addAlias('read', ['get', 'find']);
Ability.addAlias('write', ['create', 'patch', 'update', 'delete']);
Ability.addAlias('remove', ['delete']);

// user patch, create, read, update and delete any object

Ability.addAlias('crud', [
	'get',
	'find',
	'patch',
	'update',
	'delete',
	'remove',
	'create',
]);

const subjectName = (subject): string => {
	if (subject == null || typeof subject === 'string') {
		return subject;
	}
	return subject[TYPE_KEY];
};

const defineAbilitiesForAnonymous = () => {
	return AbilityBuilder.define({ subjectName }, (can: Can) => {
		can('crud', 'uploads');
		can('create', 'user');
	});
};

const defineAbilitiesForUnverifiedUser = (user: UserType) => {
	return AbilityBuilder.define({ subjectName }, (can: Can) => {
		can('read', 'roles');
		can('crud', 'users', { id: user.id });
	});
};

const defineAbilitiesForUser = user => {
	return AbilityBuilder.define({ subjectName }, (can: Can) => {
		can('read', 'roles');
		can('read', 'users');
		can('crud', 'users', { id: user.id });
		can('crud', 'foos');
		can('crud', 'bars');
	});
};

const defineAbilitiesForSuper = () => {
	return AbilityBuilder.define({ subjectName }, (can: Can) => {
		can('crud', 'roles');
		can('crud', 'users');
		can('crud', 'foos');
		can('crud', 'bars');
	});
};

export default (app: App) => {
	const allocateAbilitiesToRole = async (user: UserType) => {
		const { data: roles } = await app.service('roles').find({
			query: user != null ? { id: user.roleId } : { name: 'anonymous' },
		});

		switch (roles[0].name) {
			case 'anonymous': {
				return defineAbilitiesForAnonymous();
			}
			case 'user-unverified': {
				return defineAbilitiesForUnverifiedUser(user);
			}
			case 'user': {
				return defineAbilitiesForUser(user);
			}
			case 'super': {
				return defineAbilitiesForSuper();
			}
			default:
				throw new Error(`Unknown role: ${roles[0].name}`);
		}
	};

	return {
		allocateAbilitiesToRole,
	};
};
