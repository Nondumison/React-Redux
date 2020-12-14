// @flow strict

import jwt from 'jsonwebtoken';
import errors from '@feathersjs/errors';

import type { App } from 'types/feathers.types';
import type { UserType } from 'types/entity.types';

export const generateCode = async (n: number) => {
	const add = 1;
	let max = 12 - add;

	if (n > max) {
		return (await generateCode(max)) + (await generateCode(n - max));
	}

	max = 10 ** (n + add);
	const min = max / 10;
	// TODO: this needs to be cryptographically secure
	const number = Math.floor(Math.random() * (max - min + 1)) + min;

	return `${number}`.substring(add);
};

export const retrieveUserFromToken = (app: App) => async (token: string) => {
	try {
		const UserService = app.service('users');
		const decoded = jwt.verify(token, app.get('authentication').secret);
		const userId: string = decoded._doc.id; // eslint-disable-line no-underscore-dangle
		const users = await UserService.find({ query: { id: userId } });
		return users;
	} catch {
		throw new errors.Forbidden(new Error('Security token is invalid'));
	}
};

export const sendVerifyMail = (app: App) => async (
	user: UserType,
	option: string = 'code',
) => {
	const MailService = app.service('mailer');
	const UserService = app.service('users');
	const resetCode: string = await generateCode(6);

	let recoverText = '';
	let url = '';
	let template = '';

	const resetToken = jwt.sign(
		{
			_doc: { id: user.id },
		},
		app.get('authentication').secret,
		{ expiresIn: '1h' },
	);

	UserService.patch(user.id, { resetToken, resetCode });

	switch (option) {
		case 'code':
			recoverText = 'To verify your account please use the code below:';
			url = `${app.get('protocol')}://${app.get('ui').host}${
				app.get('ui').port
			}/verify-account/${resetToken}`;
			template = 'auth-email';
			break;
		case 'generate':
			recoverText = 'To recover your account please use the link below:';
			url = `${app.get('protocol')}://${app.get('ui').host}${
				app.get('ui').port
			}/verify-account/${resetToken}`;
			template = 'auth-email-inapp';
			break;
		default:
	}

	const config = {
		to: user.email,
		from: 'noreply.company@gmail.com',
		template,
		subject: 'Company Account Verification',
		attachments: [
			{
				filename: 'color-logo.png',
				path: `${app.get('assets')}/color-logo.png`,
				cid: 'unique@kreata.ee',
			},
		],
		context: {
			baseUrl: `${app.get('protocol')}://${app.get('host')}${app.get(
				'port',
			)}`,
			url,
			name: `${user.firstName} ${user.lastName}`,
			recoverText,
			resetCode,
			title: 'Account Verification',
			linkText: 'Verify Account',
		},
	};

	return MailService.create({ config });
};

export const sendPasswordResetMail = (app: App) => async (
	user: UserType,
	option: string = 'code',
) => {
	const MailService = app.service('mailer');
	const UserService = app.service('users');
	const resetCode = await generateCode(6);
	let recoverText = '';
	let url = '';
	let template = '';

	const resetToken = jwt.sign(
		{
			_doc: { id: user.id },
		},
		app.get('authentication').secret,
		{ expiresIn: '60m' },
	);

	UserService.patch(user.id, { resetToken, resetCode });

	switch (option) {
		case 'code':
			recoverText = 'To recover your password please use the code below:';
			url = `${app.get('ui').protocol}://${app.get('host')}${app.get(
				'port',
			)}/authmanagement?action=reset-confirm`;
			template = 'auth-email';
			break;
		case 'generate':
			recoverText = 'To recover your password please use the link below:';
			url = `${app.get('ui').protocol}://${app.get('ui').host}${
				app.get('ui').port
			}/update-password/${resetToken}`;
			template = 'reset-password-email';
			break;
		default:
	}

	const config = {
		to: user.email,
		from: 'noreply.company@gmail.com',
		template,
		subject: 'Company Password Recovery',
		attachments: [
			{
				filename: 'color-logo.png',
				path: `${app.get('assets')}/color-logo.png`,
				cid: 'unique@kreata.ee',
			},
		],
		context: {
			baseUrl: `${app.get('protocol')}://${app.get('host')}${app.get(
				'port',
			)}`,
			url,
			name: `${user.firstName} ${user.lastName}`,
			recoverText,
			resetCode,
			title: 'Password Recovery',
			linkText: 'Recover Password',
		},
	};

	return MailService.create({ config });
};

export const verifyAccount = (app: App) => (user: UserType) => {
	try {
		jwt.verify(user.resetToken, app.get('authentication').secret);
	} catch {
		throw new errors.Forbidden(new Error('Security code is invalid'));
	}
};

export const resetPassword = (app: App) => async ({
	user,
	password,
	token,
	option,
}: {|
	user: UserType,
	password: string,
	token: string,
	option: string,
	// eslint-disable-next-line consistent-return
|}) => {
	try {
		const UserService = app.service('users');
		jwt.verify(token, app.get('authentication').secret);
		switch (option) {
			case 'generate':
				return await UserService.patch(user.id, {
					verified: true,
					resetToken: null,
					password,
				});
			default:
		}
	} catch {
		throw new errors.Forbidden(
			new Error('Token has expired. You have to reset your password again.'),
		);
	}
};
