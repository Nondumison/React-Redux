// @flow strict

import { hooks } from '@feathersjs/authentication';

const { authenticate } = hooks;

export default {
	before: {
		all: [authenticate('jwt')],
	},
};
