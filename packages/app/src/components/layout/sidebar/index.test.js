import * as React from 'react';

import SideBarContainer from './';

import { render } from 'test-utils/react';

describe('Sidebar Container', () => {
	it('renders without crashing', () => {
		render(<SideBarContainer />);
	});
});
