import assert from 'assert';

import app from '../app';

describe("'authmanagement' service", () => {
	it('registered the service', () => {
		const service = app.service('authmanagement');

		assert.ok(service, 'Registered the service');
	});
});
