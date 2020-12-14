// @flow strict

import dauria from 'dauria';
import { hooks } from '@feathersjs/authentication';

import type { Context } from 'types/feathers.types';

const { authenticate } = hooks;

export default {
	before: {
		all: [authenticate('jwt')],
		find: [],
		get: [],
		create: [
			(context: Context) => {
				if (!context.data.uri && context.params.file) {
					const { buffer, mimetype } = context.params.file;
					const uri = dauria.getBase64DataURI(buffer, mimetype);
					context.data = { uri };
				}
			},
		],
		update: [],
		patch: [],
		remove: [],
	},

	after: {
		all: [],
		find: [],
		get: [],
		create: [],
		update: [],
		patch: [],
		remove: [],
	},

	error: {
		all: [],
		find: [],
		get: [],
		create: [],
		update: [],
		patch: [],
		remove: [],
	},
};
