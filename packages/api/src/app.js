// @flow strict

import DotenvFlow from 'dotenv-flow';
import compress from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import queryTypes from 'query-types';
import feathers from '@feathersjs/feathers';
import configuration from '@feathersjs/configuration';
import express from '@feathersjs/express';
import socketio from '@feathersjs/socketio';

import * as jsonApi from './hooks/jsonapi';
import logger from './logger';
import services from './services';
import appHooks from './app.hooks';
import channels from './channels';
import sequelize from './mySequelize';
import authentication from './authentication';
import authmanagement from './services/authmanagement';

import type { App } from 'types/feathers.types';

const app: App = express(feathers());

DotenvFlow.config();

// Load app configuration, see /config/*.json
app.configure(configuration());
// Enable security, CORS, compression and body parsing
app.use(helmet());
app.use(cors());
app.use(compress()); // TODO: Do we actually need this?

app.use(express.urlencoded({ extended: true })); // TODO: Do we actually need this?

app.use('/assets', express.static(app.get('assets'), { fallthrough: false }));
app.use(
	'/static',
	express.static(app.get('uploads'), { fallthrough: false }),
);

// Set up Plugins and providers
app.configure(
	// eslint-disable-next-line consistent-return
	express.rest((req, res, next) => {
		if (res.data === undefined) {
			return next();
		}
		if (req.path === '/authmanagement' || req.path === '/authentication') {
			res.format({
				'application/json': () => {
					res.json(res.data);
				},
			});
		} else {
			res.format({
				'application/vnd.api+json': () => {
					res.json(res.data);
				},
			});
		}
	}),
);
app.use(queryTypes.middleware());
app.use((req, _, next) => {
	req.feathers.protocol = req.protocol;
	next();
});
app.configure(socketio());
app.configure(sequelize);

// Set up authentication
app.configure(authentication);
app.configure(authmanagement);

// Set up our services (see `services/index.js`)
app.use(express.json({ type: 'application/vnd.api+json' }));
app.configure(services);

// Set up event channels (see channels.js)
app.configure(channels);

// Configure a middleware for 404s and the error handler
app.use(express.notFound());
app.use(jsonApi.errorHandler);
app.use(express.errorHandler({ logger }));

app.hooks(appHooks);

export default app;
