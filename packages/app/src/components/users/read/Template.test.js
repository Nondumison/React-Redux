import * as React from 'react';
import { Route } from 'react-router-dom';

import Read from './Template';

import { render } from 'test-utils/react';
import { getState } from 'test-utils/redux';
import * as selectors from 'selectors';

const user = Object.values(selectors.entity.getAll('user', getState()))[0];

describe('Read component', () => {
	it('renders without crashing', () => {
		render(
			<Route path="/:id">
				{props => (
					<Read user={user} fetch={() => {}} remove={() => {}} {...props} />
				)}
			</Route>,
			{ history: { initialEntries: [`/${user.id}`] } },
		);
	});
});
