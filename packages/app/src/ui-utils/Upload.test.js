import * as React from 'react';

import Upload from './Upload';

import { render } from 'test-utils/react';

describe('Upload', () => {
	it('renders without crashing', () => {
		render(<Upload />);
	});
});
