import * as React from 'react';

import AlertDialog from './AlertDialog';

import { render } from 'test-utils/react';

describe('Alert Dialog', () => {
	it('renders without crashing', () => {
		render(<AlertDialog show title="alert" message="alert" />);
	});
});
