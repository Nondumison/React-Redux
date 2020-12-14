import * as React from 'react';
import { Route } from 'react-router-dom';

import Update from './Template';

import { render } from 'test-utils/react';
import { getState } from 'test-utils/redux';
import * as selectors from 'selectors';

const role = Object.values(selectors.entity.getAll('role', getState()))[0];

describe('Update component', () => {
	it('renders without crashing', () => {
		render(
			<Route path="/:id/edit">
				{props => (
					<Update
						role={role}
						errors={[]}
						fetch={() => {}}
						clearErrors={() => {}}
						{...props}
					/>
				)}
			</Route>,
			{ history: { initialEntries: [`/${role.id}/edit`] } },
		);
	});
});
