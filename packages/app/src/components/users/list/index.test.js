import * as React from 'react';
import { Route } from 'react-router-dom';

import ListContainer from './';

import { render } from 'test-utils/react';

describe('ListContainer component', () => {
	it('renders without crashing', () => {
		render(<Route path="/" component={ListContainer} />, {
			history: { initialEntries: ['/'] },
		});
	});
});
