import * as React from 'react';

import SideBarTemplate from './Sidebar';

import { render } from 'test-utils/react';

describe('Sidebar', () => {
	it('renders without crashing', () => {
		render(<SideBarTemplate />);
	});
});
