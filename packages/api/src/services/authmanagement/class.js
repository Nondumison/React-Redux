// @flow strict

/* eslint-disable class-methods-use-this */

import Joi from '@hapi/joi';
import _get from 'lodash/get';
import errors from '@feathersjs/errors';

import {
	sendVerifyMail,
	sendPasswordResetMail,
	resetPassword,
	retrieveUserFromToken,
	verifyAccount,
} from './utils';

import type { UserType } from 'types/entity.types';
import type { Params, FeathersPayload, App } from 'types/feathers.types';

type AuthData = {|
	+action?: string,
	+option?: string,
	+email?: string,
	+token?: string,
	+code?: string,
	+password?: string,
|};

export class Service {
	options;

	emit;

	app: App;

	constructor(options) {
		this.options = options || {};
	}

	find() {
		return [];
	}

	get(id: string) {
		return {
			id,
			text: `A new message with ID: ${id}!`,
		};
	}

	// eslint-disable-next-line consistent-return
	async create(data: AuthData, params: Params) {
		const action: string =
			data.action != null ? data.action : _get(params, 'query.action');
		const option: string =
			data.option != null ? data.option : _get(params, 'query.option');

		switch (action) {
			case 'verify': {
				const validation = Joi.validate(
					data.email,
					Joi.string()
						.email()
						.label('Verification email'),
				);
				const users = await this.app.service('users').find({
					query: { email: data.email },
				});
				if (validation.error || users.total < 1) {
					throw new errors.BadRequest('Invalid email', {
						email: data.email,
					});
				}
				try {
					return sendVerifyMail(this.app)(users.data[0], option);
				} catch {
					throw new errors.GeneralError(new Error('Server error'));
				}
			}

			case 'verify-email-token': {
				const schema = Joi.object().keys({
					token: Joi.string()
						.required()
						.label('Reset token'),
					action: Joi.string()
						.required()
						.label('Action type'),
				});
				const validation = Joi.validate(data, schema);
				if (validation.error) {
					throw new errors.BadRequest('Token is required');
				}

				const users = await retrieveUserFromToken(this.app)(data.token);
				const user: UserType = _get(users, 'data[0]');

				try {
					if (Object.keys(user).length > 0) {
						// Emit verified event to be caught by the client
						this.app
							.service('users')
							.patch(user.id, { verified: true, resetToken: null });
						this.emit('verified', { user });
						return {
							data: {
								message: 'User has been verified successfully',
								user,
							},
							meta: {
								code: 204,
							},
						};
					}
					break;
				} catch {
					throw new errors.GeneralError(new Error('Server error'));
				}
			}

			case 'verify-confirm': {
				// # TODO Handle Validation message per object property

				const schema = Joi.object().keys({
					code: Joi.number()
						.required()
						.label('Code'),
					email: Joi.string()
						.email()
						.label('Verification email'),
					action: Joi.string()
						.required()
						.label('Action type'),
				});

				const validation = Joi.validate(data, schema);
				const users = await this.app
					.service('users')
					.find({ query: { email: data.email } });

				if (validation.error || users.total < 1) {
					throw new errors.BadRequest('Invalid email', {
						email: data.email,
					});
				}
				try {
					const res = await verifyAccount(this.app)(users.data[0], data.code);
					if (Object.keys(res).length > 0) {
						// Emit verified event to be caught by the client
						this.emit('verified', { user: res });
						return {
							data: {
								message: 'User has been verified successfully',
							},
							meta: {
								code: 204,
							},
						};
					}
					break;
				} catch {
					throw new errors.GeneralError(new Error('Server error'));
				}
			}

			case 'reset': {
				const validation = Joi.validate(
					data.email,
					Joi.string()
						.email()
						.label('Recovery email'),
				);
				const users = await this.app.service('users').find({
					query: { email: data.email },
				});

				if (validation.error || users.total < 1) {
					return new errors.BadRequest('Invalid email', {
						email: data.email,
					});
				}
				try {
					return sendPasswordResetMail(this.app)(users.data[0], option);
				} catch {
					throw new errors.GeneralError(new Error('Server error'));
				}
			}

			case 'reset-confirm': {
				let users = {};
				let schema; // eslint-disable-line init-declarations
				switch (option) {
					case 'code': {
						schema = Joi.object().keys({
							code: Joi.number()
								.required()
								.label('Code'),
							email: Joi.string()
								.email()
								.label('Verification email'),
							password: Joi.string()
								.required()
								.label('Password'),
							option: Joi.string()
								.required()
								.label('Reset Option'),
							action: Joi.string()
								.required()
								.label('Action type'),
						});
						users = await this.app.service('users').find({
							query: { email: data.email },
						});
						break;
					}

					case 'generate': {
						schema = Joi.object().keys({
							token: Joi.string()
								.required()
								.label('Reset token'),
							password: Joi.string()
								.required()
								.label('Password'),
						});
						users = await retrieveUserFromToken(this.app)(data.token);
						break;
					}
					default:
				}

				const validation = Joi.validate(data, schema);
				if (validation.error || users.total < 1) {
					throw new errors.BadRequest('Invalid email', {
						errors: validation.error.details,
					});
				}

				try {
					const user: UserType = _get(users, 'data[0]');
					const token = option === 'generate' ? data.token : user.resetToken;
					const res = await resetPassword(this.app)({
						user,
						password: data.password,
						token,
						option,
					});
					if (Object.keys(res).length > 0) {
						return {
							data: {
								message: 'Password has been updated.',
							},
							meta: {
								code: 204,
							},
						};
					}
					break;
				} catch {
					throw new errors.GeneralError(new Error('Server error'));
				}
			}
			default:
				throw new errors.BadRequest(`Action '${data.action}' is invalid.`, {
					errors: { $className: 'badParams' },
				});
		}
	}

	update(_, data: FeathersPayload) {
		return data;
	}

	patch(_, data: FeathersPayload) {
		return data;
	}

	remove(id: string) {
		return { id };
	}

	setup(app: App) {
		this.app = app;
	}
}

export default options => new Service(options);
