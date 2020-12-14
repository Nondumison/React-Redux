// @flow strict

import { combineReducers, type Reducer } from 'redux';

import { RECEIVE, CLEAR } from 'actions/notification';
import type { Action } from 'actions/notification';

export type Notification = {|
	+id: string,
	+message: string,
	+type: 'info' | 'warning' | 'success' | 'error',
|};

type Notifications = { [id: string]: Notification };

const byId = (state: Notifications = {}, action: Action): Notifications => {
	switch (action.type) {
		case RECEIVE:
			return {
				...state,
				[action.payload.id]: action.payload,
			};
		case CLEAR:
			return Object.entries(state)
				.filter(([id]) => !action.payload.includes(id))
				.reduce(
					(acc, [id, notification]) => ({
						...acc,
						[id]: notification,
					}),
					{},
				);
		default:
			return state;
	}
};

type Ids = $ReadOnlyArray<string>;

const allIds = (state: Ids = [], action: Action): Ids => {
	switch (action.type) {
		case RECEIVE:
			return [...new Set([...state, action.payload.id])];
		case CLEAR:
			return state.filter(id => !action.payload.includes(id));
		default:
			return state;
	}
};

export type State = {|
	+byId: Notifications,
	+allIds: Ids,
|};

const reducer: Reducer<State, Action> = combineReducers({
	byId,
	allIds,
});

export default reducer;
