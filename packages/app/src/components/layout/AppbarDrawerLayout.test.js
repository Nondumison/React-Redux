import * as React from 'react';

import AppbarDrawerLayout from './AppbarDrawerLayout';

import { render } from 'test-utils/react';

describe('App bar drawer layout', () => {
	it('renders without crashing', () => {
		render(<AppbarDrawerLayout />);
	});
});
