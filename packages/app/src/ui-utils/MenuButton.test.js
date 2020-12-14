import * as React from 'react';

import MenuButton from './MenuButton';

import { render } from 'test-utils/react';

describe('Menu Button', () => {
	it('renders without crashing', () => {
		render(<MenuButton />);
	});
});
