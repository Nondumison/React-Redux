// @flow strict

import { createStore, compose } from 'redux';
import thunkSubscribeEnhancer from 'redux-thunk-subscribe';

import history from './myHistory';

import { loadState } from 'localStorage';
import reducer, { type State } from 'reducers';
import type { Dispatch } from 'index';
import type { Action } from 'actions';

const persistedState = loadState();

declare var window: {
	__REDUX_DEVTOOLS_EXTENSION_COMPOSE__: $Compose,
};

// Add support for Redux DevTools browser extensions
/* eslint-disable no-underscore-dangle */
const composeEnhancers =
	window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ != null
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		: compose;
/* eslint-enable */

const enhancer = composeEnhancers(
	thunkSubscribeEnhancer.withExtraArgument({ history }),
);

/**
 * Creates a Redux store.
 *
 * The store is:
 * * initialized by a `state` stored in `localStorage`, if present;
 * * enhanced by
 *   [`redux-thunk-subscribe`](https://github.com/AugurProject/redux-thunk-subscribe),
 *   therefore able to understand thunks, the thunks have the store’s `subscribe`
 *   method as their 3rd argument; and
 * * connected to the [Redux DevTools
 *   Extension](http://extension.remotedev.io/), if present.
 */
const configureStore = (seedState?: State) =>
	createStore<State, Action, Dispatch>(
		reducer,
		seedState || persistedState,
		enhancer,
	);

export default configureStore;
