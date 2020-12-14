import * as React from 'react';
import { Route } from 'react-router-dom';

import List from './Template';

import { render } from 'test-utils/react';
import { getState } from 'test-utils/redux';
import * as selectors from 'selectors';

const roles = Object.values(selectors.entity.getAll('role', getState()));

describe('List component', () => {
	it('renders without crashing', () => {
		render(
			<Route path="/">
				{props => <List roles={roles} fetchAll={() => {}} {...props} />}
			</Route>,
			{ history: { initialEntries: ['/'] } },
		);
	});
});
