import * as React from 'react';

import AppContainer from './';

import { render } from 'test-utils/react';

describe('App Container', () => {
	it('renders without crashing', () => {
		render(<AppContainer />);
	});
});
