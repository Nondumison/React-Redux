import * as React from 'react';

import LinkButton from './LinkButton';

import { render } from 'test-utils/react';

describe('Link Button', () => {
	it('renders without crashing', () => {
		render(<LinkButton />);
	});
});
