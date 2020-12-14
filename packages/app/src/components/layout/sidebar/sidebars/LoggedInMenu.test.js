import * as React from 'react';

import LoggedInMenu from './LoggedInMenu';

import { render } from 'test-utils/react';

describe('Logged in menu', () => {
	it('renders without crashing', () => {
		render(<LoggedInMenu />);
	});
});
