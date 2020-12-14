// @flow strict

import { hooks } from '@feathersjs/authentication';
import { NotAuthenticated } from '@feathersjs/errors';

import type { Context } from 'types/feathers.types';

const { authenticate } = hooks;
const verifyIdentity = authenticate('jwt');

const hasToken = (context: Context): boolean =>
	context.params.headers == null ? false : context.data.accessToken != null;

const authenticateUser = (context: Context) => {
	try {
		return verifyIdentity(context);
	} catch (error) {
		if (error instanceof NotAuthenticated && !hasToken(context)) {
			return context;
		}

		throw error;
	}
};

export default authenticateUser;
