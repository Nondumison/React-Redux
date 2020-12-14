// @flow strict

/* eslint-disable class-methods-use-this */

import errors from '@feathersjs/errors';
import _get from 'lodash/get';

import logger from '../../logger';

import { retrieveTransport } from './utils';

import type { App, Params, FeathersPayload } from 'types/feathers.types';

type MailerData = {|
	+action?: string,
	+option?: string,
	+config?: { +[string]: string },
	+message?: string,
	+email?: string,
|};

export class Service {
	options;

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

	async create(data: MailerData, params: Params) {
		let res; // eslint-disable-line init-declarations
		const action: string =
			params.action || _get(params, 'query.action') || data.action;
		const smtpTransport = retrieveTransport(this.app)();

		switch (action) {
			case 'contact': {
				if (data.email != null) {
					res = await smtpTransport.sendMail({
						to: this.app.get('contact').primary,
						from: data.email,
						template: 'contact-email',
						subject: 'Company - Contact Message',
						context: {
							title: 'Company - Contact Email',
							message: data.message,
						},
					});
				}
				break;
			}
			default:
				res = await smtpTransport.sendMail(data.config);
		}
		logger.info('MAILER RES %o', res);
		if (res != null && res.accepted.length > 0) {
			return Promise.resolve({
				data: {
					message: 'Email has been sent successfully',
				},
				meta: {
					code: 204,
				},
			});
		}
		return Promise.resolve(
			new errors.GeneralError(new Error('Email could not be sent.')),
		);
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
