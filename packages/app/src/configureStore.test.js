import configureStore from './configureStore';

import { state } from 'test-utils/redux';

it('exports a function', () => {
	expect(typeof configureStore).toBe('function');
});

it('creates a Redux store', () => {
	const { getState, dispatch, subscribe, replaceReducer } = configureStore(
		state,
	);

	expect(typeof getState).toBe('function');
	expect(typeof dispatch).toBe('function');
	expect(typeof subscribe).toBe('function');
	expect(typeof replaceReducer).toBe('function');
});
