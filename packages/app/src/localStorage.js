// @flow strict

import type { State } from './reducers';

export const loadState = () => {
	const serializedState = localStorage.getItem('state');
	if (serializedState == null) {
		return undefined;
	}
	return (JSON.parse(serializedState): $Shape<State>);
};

export const saveState = (state: {}) => {
	try {
		const serializedState = JSON.stringify(state);
		localStorage.setItem('state', serializedState);
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error(error);
	}
};
