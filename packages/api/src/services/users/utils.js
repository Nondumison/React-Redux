// @flow strict

import crypto from 'crypto';
import util from 'util';

import type { Context } from 'types/feathers.types';

export const generateNewUserPassword = async (context: Context) => {
	if (context.data.password === undefined) {
		const chars =
			'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
		const length = 12;
		const randomBytes = await util.promisify(crypto.randomBytes)(length);

		const password = [...randomBytes.values()]
			.map(byte => chars[byte % chars.length])
			.join('');

		// eslint-disable-next-line require-atomic-updates
		context.data.password = password;
	}
	return context;
};

export const verifyNewUser = (context: Context) => {
	context.app.service('authmanagement').create({
		action: 'reset',
		option: 'generate',
		email: context.result.email,
	});
	return context;
};
