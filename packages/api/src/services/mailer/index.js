// @flow strict

// Initializes the `mailer` service on path `/mailer`
import createService from './class';
import hooks from './hooks';

import type { App } from 'types/feathers.types';

const mailer = (app: App) => {
	const paginate = app.get('paginate');

	const options = {
		paginate,
	};

	// Initialize our service with any options it requires
	app.use('/mailer', createService(options));

	// Get our initialized service so that we can register hooks
	const service = app.service('mailer');

	service.hooks(hooks);
};

export default mailer;
