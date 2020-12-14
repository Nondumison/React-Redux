// @flow strict

import users from './users';
import roles from './roles';
import mailer from './mailer';
import uploads from './uploads';
import foos from './foos';
import bars from './bars';

import type { App } from 'types/feathers.types';

export default (app: App) => {
	app.configure(users);
	app.configure(roles);
	app.configure(mailer);
	app.configure(uploads);
	app.configure(foos);
	app.configure(bars);
};
