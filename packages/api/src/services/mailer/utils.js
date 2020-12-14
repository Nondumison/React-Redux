// @flow strict

/* eslint-disable import/prefer-default-export */

import path from 'path';

import hbs from 'nodemailer-express-handlebars';
import nodemailer from 'nodemailer';

import type { App } from 'types/feathers.types';

export const retrieveTransport = (app: App) => () => {
	const { user, pass }: {| user: string, pass: string |} = app.get('gmail');

	const smtpTransport = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user,
			pass,
		},
	});

	const handlebarsOptions = {
		viewEngine: {
			extName: '.hbs',
			partialsDir: path.resolve('./src/services/mailer/templates/'),
			layoutsDir: path.resolve('./src/services/mailer/templates/'),
			// defaultLayout: 'email.body.hbs',
		},
		viewPath: path.resolve('./src/services/mailer/templates/'),
		extName: '.html',
	};

	smtpTransport.use('compile', hbs(handlebarsOptions));

	return smtpTransport;
};
