import * as React from 'react';

import LoginContainer from './';

import { render } from 'test-utils/react';

describe('Login Container', () => {
	it('renders without crashing', () => {
		render(<LoginContainer />);
	});
});
