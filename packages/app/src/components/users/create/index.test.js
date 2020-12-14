import * as React from 'react';
import { Route } from 'react-router-dom';

import AddContainer from './';

import { render } from 'test-utils/react';

describe('AddContainer component', () => {
	it('renders without crashing', () => {
		render(<Route path="/new" component={AddContainer} />, {
			history: { initialEntries: ['/new'] },
		});
	});
});
