// @flow strict

import { hooks as authHooks } from '@feathersjs/authentication';
import { hooks as authLocalHooks } from '@feathersjs/authentication-local';

import { generateNewUserPassword, verifyNewUser } from './utils';

const { authenticate } = authHooks;
const { hashPassword, protect } = authLocalHooks;

export default {
	before: {
		find: [authenticate('jwt')],
		get: [authenticate('jwt')],
		create: [generateNewUserPassword, hashPassword()],
		update: [authenticate('jwt'), hashPassword()],
		patch: [authenticate('jwt'), hashPassword()],
		remove: [authenticate('jwt')],
	},

	after: {
		all: [protect('password')],
		create: [verifyNewUser],
	},
};
