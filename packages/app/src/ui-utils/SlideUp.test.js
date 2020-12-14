import * as React from 'react';

import SlideUp from './SlideUp';

import { render } from 'test-utils/react';

describe('Slide Up', () => {
	it('renders without crashing', () => {
		render(
			<SlideUp>
				<div>test</div>
			</SlideUp>,
		);
	});
});
