// @flow strict

import createService from 'feathers-sequelize';

import createModel from '../../models/role';
import jsonApiHooks from '../../hooks/jsonapi';

import hooks from './hooks';

import type { App } from 'types/feathers.types';

export default (app: App) => {
	const Model = createModel(app);
	const paginate = app.get('paginate');

	app.use(
		'/roles',
		createService({
			Model,
			paginate,
		}),
	);

	app.service('roles').hooks(jsonApiHooks(hooks));
};
