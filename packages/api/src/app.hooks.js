// @flow strict

// Application hooks that run for every service
import { when } from 'feathers-hooks-common';

import logger from './hooks/log';
import authenticateUser from './hooks/authenticate';
import authorize from './hooks/authorize';

const whenAuthRequired = (...hooks) =>
	when(
		context =>
			context.params.provider &&
			![
				context.app.get('authentication').path,
				'/authmanagement',
				'/uploads',
			].includes(`/${context.path}`),
		...hooks,
	);

export default {
	before: {
		all: [logger(), whenAuthRequired(authenticateUser, authorize)],
		find: [],
		get: [],
		create: [],
		update: [],
		patch: [],
		remove: [],
	},

	after: {
		all: [logger()],
		find: [],
		get: [],
		create: [],
		update: [],
		patch: [],
		remove: [],
	},

	error: {
		all: [logger()],
		find: [],
		get: [],
		create: [],
		update: [],
		patch: [],
		remove: [],
	},
};
