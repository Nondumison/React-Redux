// @flow strict

import { hooks as authHooks } from '@feathersjs/authentication';

export default {
	before: {
		all: [authHooks.authenticate('jwt')],
	},
};
