import * as React from 'react';
import { Route } from 'react-router-dom';

import Create from './Template';

import { render } from 'test-utils/react';

describe('Create component', () => {
	it('renders without crashing', () => {
		render(
			<Route path="/new">
				{props => (
					<Create
						errors={[]}
						create={() => {}}
						clearErrors={() => {}}
						{...props}
					/>
				)}
			</Route>,
			{ history: { initialEntries: ['/new'] } },
		);
	});
});
