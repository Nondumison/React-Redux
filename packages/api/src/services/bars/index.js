// @flow strict

import createService from 'feathers-sequelize';

// Initializes the `foo` service on path `/foo`
import createModel from '../../models/bar';
import jsonApiHooks from '../../hooks/jsonapi';

import hooks from './hooks';

import type { App } from 'types/feathers.types';

export default (app: App) => {
	const Model = createModel(app);
	const paginate = app.get('paginate');

	app.use(
		'/bars',
		createService({
			Model,
			paginate,
		}),
	);

	app.service('bars').hooks(jsonApiHooks(hooks));
};
