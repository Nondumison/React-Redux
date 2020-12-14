// @flow strict

import logger from './logger';
import app from './app';

const port: number = app.get('port');
const server = app.listen(port);

server.on('listening', () =>
	logger.info(
		'Feathers application started on http://%s:%d',
		app.get('host'),
		port,
	),
);
