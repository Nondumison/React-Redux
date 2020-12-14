import * as React from 'react';
import { Route } from 'react-router-dom';

import UpdateContainer from './';

import { render } from 'test-utils/react';
import { getState } from 'test-utils/redux';
import * as selectors from 'selectors';

const { id } = Object.values(selectors.entity.getAll('user', getState()))[0];

describe('UpdateContainer component', () => {
	it('renders without crashing', () => {
		render(<Route path="/:id/edit" component={UpdateContainer} />, {
			history: { initialEntries: [`/${id}/edit`] },
		});
	});
});
