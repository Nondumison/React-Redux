import * as React from 'react';

import ForgotContainer from './';

import { render } from 'test-utils/react';

describe('Forgot Container', () => {
	it('renders without crashing', () => {
		render(<ForgotContainer />);
	});
});
