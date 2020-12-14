import * as React from 'react';

import Template from './Template';

import { render } from 'test-utils/react';
import { set as notify } from 'actions/notification';
import * as selectors from 'selectors';
import configureStore from 'configureStore';

const notificationId = '1';
const store = configureStore();
store.dispatch(
	notify({
		type: 'info',
		message: 'foo',
		id: notificationId,
	}),
);
const notification = selectors.notification.get(
	store.getState(),
	notificationId,
);

describe('Notification Template', () => {
	it('renders without crashing', () => {
		render(<Template {...notification} />);
	});
});
