import * as React from 'react';

import Template from './Template';

import { render } from 'test-utils/react';
import * as selectors from 'selectors';
import configureStore from 'configureStore';

const store = configureStore();
const state = store.getState();
const errors = selectors.auth.getErrors(state);

describe('Login template', () => {
	it('renders without crashing', () => {
		render(<Template {...{ errors }} />);
	});
});
