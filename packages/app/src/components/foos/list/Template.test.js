import * as React from 'react';
import { Route } from 'react-router-dom';

import List from './Template';

import { render } from 'test-utils/react';
import { getState } from 'test-utils/redux';
import * as selectors from 'selectors';

const foos = Object.values(selectors.entity.getAll('foo', getState()));

describe('List component', () => {
	it('renders without crashing', () => {
		render(
			<Route path="/">
				{props => <List foos={foos} fetchAll={() => {}} {...props} />}
			</Route>,
			{ history: { initialEntries: ['/'] } },
		);
	});
});
