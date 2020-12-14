// @flow strict

import express from '@feathersjs/express';
import authentication from '@feathersjs/authentication';
import jwt from '@feathersjs/authentication-jwt';
import local from '@feathersjs/authentication-local';

import type { App } from './types/feathers.types';
import type { UserType } from './types/entity.types';

type AuthTypes = 'jwt' | 'local';

type AuthenticationConfig = {|
	secret: string,
	strategies: Array<AuthTypes>,
	path: string,
	service: string,
	jwt: {
		header: {
			typ: string,
		},
		audience: string,
		subject: string,
		issuer: string,
		algorithm: 'HS256',
		expiresIn: '1d',
	},
	local: {
		entity: string,
		usernameField: string,
		passwordField: string,
	},
|};

// eslint-disable-next-line flowtype/require-exact-type
type Params = {
	+user?: UserType,
};

export default (app: App) => {
	const config: AuthenticationConfig = app.get('authentication');

	// Set up authentication with the secret
	app.use('/authentication', express.json());
	app.configure(authentication(config));
	app.configure(jwt());
	app.configure(local());

	// The `authentication` service is used to create a JWT.
	// The before `create` hook registers strategies that can be used
	// to create a new valid JWT (e.g. local or oauth2)
	app.service('authentication').hooks({
		before: {
			create: [authentication.hooks.authenticate(config.strategies)],
			remove: [authentication.hooks.authenticate('jwt')],
		},
		after: {
			create: [
				context => {
					const { user = {} }: Params = context.params;
					context.result = {
						data: {
							token: context.result.accessToken,
							userId: user.id,
						},
					};
					return context;
				},
			],
		},
		error: {
			all: [
				context => {
					switch (context.error.code) {
						case 401:
							switch (context.error.message) {
								case 'Invalid login':
									context.error.message = 'Invalid Email or Password';
									break;
								default:
								// Do nothing
							}
							break;
						default:
						// Do nothing
					}
					return context;
				},
			],
		},
	});
};
