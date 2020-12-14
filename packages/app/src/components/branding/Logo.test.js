import * as React from 'react';

import Logo from './Logo';

import { render } from 'test-utils/react';

describe('Logo', () => {
	it('renders without crashing', () => {
		render(<Logo />);
	});
});
