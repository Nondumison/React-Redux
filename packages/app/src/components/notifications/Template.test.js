import * as React from 'react';

import Template from './Template';

import { render } from 'test-utils/react';
import * as selectors from 'selectors';
import { state } from 'test-utils/redux';

const ids = selectors.notification.getIds(state);
const notifications = selectors.notification.getAll(state);

describe('Notification Template', () => {
	it('renders notification without crashing', () => {
		render(<Template ids={ids} notifications={notifications} />);
	});
});
