// @flow strict

import { combineReducers, type Reducer } from 'redux';

import {
	FETCH,
	RECEIVE,
	CLEAR,
	CLEAR_ERRORS,
	type Action,
} from 'actions/auth';

type Loading = boolean;

const loading = (state: Loading = false, action: Action): Loading => {
	switch (action.type) {
		case FETCH:
			return true;
		case RECEIVE:
			return false;
		default:
			return state;
	}
};

const errors = (
	state: $ReadOnlyArray<Error> = [],
	action: Action,
): $ReadOnlyArray<Error> => {
	switch (action.type) {
		case RECEIVE:
			if (action.error === true) {
				return action.payload;
			}
			return [];
		case CLEAR_ERRORS:
			return [];
		default:
			return state;
	}
};

export type Token = string | null;

const token = (state: Token = null, action: Action): Token => {
	switch (action.type) {
		case RECEIVE:
			if (action.error === true) {
				return state;
			}
			return action.payload.token != null ? action.payload.token : state;
		case CLEAR:
			return null;
		default:
			return state;
	}
};

export type UserID = string | null;

const userId = (state: UserID = null, action: Action): UserID => {
	switch (action.type) {
		case RECEIVE:
			if (action.error === true) {
				return state;
			}
			return action.payload.userId != null ? action.payload.userId : state;
		case CLEAR:
			return null;
		default:
			return state;
	}
};

export type RoleID = string | null;

const roleId = (state: RoleID = null, action: Action): RoleID => {
	switch (action.type) {
		case RECEIVE:
			if (action.error === true) {
				return state;
			}
			return action.payload.roleId != null ? action.payload.roleId : state;
		case CLEAR:
			return null;
		default:
			return state;
	}
};

// TODO: Which of these props are actually still used?
export type State = {|
	+loading: Loading,
	+errors: $ReadOnlyArray<Error>,
	+token: Token,
	+userId: UserID,
	+roleId: RoleID,
|};

const reducer: Reducer<State, Action> = combineReducers({
	loading,
	errors,
	token,
	userId,
	roleId,
});

export default reducer;
