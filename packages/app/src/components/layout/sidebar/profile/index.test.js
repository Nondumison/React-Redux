import * as React from 'react';

import ProfileContainer from './';

import { render } from 'test-utils/react';

describe('Profile Container', () => {
	it('renders without crashing', () => {
		render(<ProfileContainer />);
	});
});
