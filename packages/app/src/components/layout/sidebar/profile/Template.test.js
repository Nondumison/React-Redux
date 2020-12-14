import * as React from 'react';

import Template from './Template';

import { render } from 'test-utils/react';

describe('Profile template', () => {
	it('renders without crashing', () => {
		render(<Template />);
	});
});
