import * as React from 'react';
import { Route } from 'react-router-dom';

import List from './Template';

import { render } from 'test-utils/react';
import { getState } from 'test-utils/redux';
import * as selectors from 'selectors';

const users = Object.values(selectors.entity.getAll('user', getState()));

describe('List component', () => {
	it('renders without crashing', () => {
		render(
			<Route path="/">
				{props => <List users={users} fetchAll={() => {}} {...props} />}
			</Route>,
			{ history: { initialEntries: ['/'] } },
		);
	});
});
