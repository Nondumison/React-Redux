import * as React from 'react';
import { Route } from 'react-router-dom';

import Update from './Template';

import { render } from 'test-utils/react';
import { getState } from 'test-utils/redux';
import * as selectors from 'selectors';

const bar = Object.values(selectors.entity.getAll('bar', getState()))[0];

describe('Update component', () => {
	it('renders without crashing', () => {
		render(
			<Route path="/:id/edit">
				{props => (
					<Update
						bar={bar}
						errors={[]}
						fetch={() => {}}
						clearErrors={() => {}}
						{...props}
					/>
				)}
			</Route>,
			{ history: { initialEntries: [`/${bar.id}/edit`] } },
		);
	});
});
