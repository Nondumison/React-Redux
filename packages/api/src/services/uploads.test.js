import assert from 'assert';

import app from '../app';

describe("'uploads' service", () => {
	it('registered the service', () => {
		const service = app.service('uploads');

		assert.ok(service, 'Registered the service');
	});
});
