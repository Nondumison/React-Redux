// @flow strict

import createService from 'feathers-sequelize';

// Initializes the `users` service on path `/users`
import createModel from '../../models/user';
import jsonApiHooks from '../../hooks/jsonapi';

import hooks from './hooks';

import type { App } from 'types/feathers.types';

export default (app: App) => {
	const Model = createModel(app);
	const paginate = app.get('paginate');

	app.use(
		'/users',
		createService({
			Model,
			paginate,
		}),
	);

	app.service('users').hooks(jsonApiHooks(hooks));
};
