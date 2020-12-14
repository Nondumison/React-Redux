import * as React from 'react';

import NotificationContainer from './';

import { render } from 'test-utils/react';
import * as selectors from 'selectors';
import { state } from 'test-utils/redux';

const notification = Object.values(selectors.notification.getAll(state))[0];

describe('Notification Container', () => {
	it('renders without crashing', () => {
		render(<NotificationContainer {...notification} />);
	});
});
