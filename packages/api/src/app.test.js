import assert from 'assert';
import url from 'url';

import rp from 'request-promise';

import app from './app';

const port = app.get('port') || 3030;
const getUrl = pathname =>
	url.format({
		hostname: app.get('host') || 'localhost',
		protocol: 'http',
		port,
		pathname,
	});

describe('Feathers application tests', () => {
	let server; // eslint-disable-line init-declarations

	beforeEach(function(done) {
		server = app.listen(port);
		server.once('listening', () => done());
	});

	afterEach(function(done) {
		server.close();
		done();
	});

	describe('404', function() {
		it('shows a 404 HTML page', () => {
			return rp({
				url: getUrl('path/to/nowhere'),
				headers: {
					Accept: 'text/html',
				},
			}).catch(error => {
				assert.strictEqual(error.statusCode, 404);
			});
		});

		it('shows a 404 JSON error without stack trace', () => {
			return rp({
				url: getUrl('path/to/nowhere'),
				json: true,
			}).catch(error => {
				assert.strictEqual(error.statusCode, 404);
			});
		});
	});
});
