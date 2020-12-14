import * as React from 'react';

import Buttom from './Button';

import { render } from 'test-utils/react';

describe('Button', () => {
	it('renders without crashing', () => {
		render(<Buttom />);
	});
});
