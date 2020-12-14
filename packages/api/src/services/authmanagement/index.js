// @flow strict

// Initializes the `authmanagement` service on path `/authmanagement`

import express from '@feathersjs/express';

import createService from './class';

import type { App } from 'types/feathers.types';

export default (app: App) => {
	// Initialize our service with any options it requires
	app.use(
		'/authmanagement',
		express.json(),
		createService(),
		(_, res, next) => {
			res.set('Content-Type', 'application/json');
			next();
		},
	);
};
