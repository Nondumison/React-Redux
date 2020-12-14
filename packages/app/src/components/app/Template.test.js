/* eslint-disable react/no-children-prop */
import * as React from 'react';
import { Route } from 'react-router-dom';

import Template from './Template';

import { render } from 'test-utils/react';
import * as selectors from 'selectors';
import configureStore from 'configureStore';

const store = configureStore();
const state = store.getState();

const isLoggedIn = Boolean(selectors.auth.getToken(state));

describe('App template', () => {
	it('renders without crashing', () => {
		render(
			<Route
				children={({ location }) => (
					<Template {...{ isLoggedIn, location }} />
				)}
			/>,
		);
	});
});
