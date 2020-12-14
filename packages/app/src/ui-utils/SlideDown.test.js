import * as React from 'react';

import SlideDown from './SlideDown';

import { render } from 'test-utils/react';

describe('Slide Down', () => {
	it('renders without crashing', () => {
		render(
			<SlideDown>
				<div>test</div>
			</SlideDown>,
		);
	});
});
