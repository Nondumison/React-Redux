import * as React from 'react';

import NotificationContainer from './';

import { render } from 'test-utils/react';

describe('Notification Container', () => {
	it('renders without crashing', () => {
		render(<NotificationContainer />);
	});
});
