import * as React from 'react';
import { Route } from 'react-router-dom';

import Read from './Template';

import { render } from 'test-utils/react';
import { getState } from 'test-utils/redux';
import * as selectors from 'selectors';

const bar = Object.values(selectors.entity.getAll('bar', getState()))[0];

describe('Read component', () => {
	it('renders without crashing', () => {
		render(
			<Route path="/:id">
				{props => (
					<Read bar={bar} fetch={() => {}} remove={() => {}} {...props} />
				)}
			</Route>,
			{ history: { initialEntries: [`/${bar.id}`] } },
		);
	});
});
