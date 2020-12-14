import * as React from 'react';

import Content from './Content';

import { render } from 'test-utils/react';

describe('Content', () => {
	it('renders without crashing', () => {
		render(<Content />);
	});
});
