import assert from 'assert';

import app from '../app';

describe("'roles' service", () => {
	it('registered the service', () => {
		const service = app.service('roles');

		assert.ok(service, 'Registered the service');
	});
});
