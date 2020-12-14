import * as React from 'react';

import LoggedOutMenu from './LoggedOutMenu';

import { render } from 'test-utils/react';

describe('Logged out menu', () => {
	it('renders without crashing', () => {
		render(<LoggedOutMenu />);
	});
});
