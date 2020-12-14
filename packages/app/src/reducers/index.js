// @flow strict

import { combineReducers, type CombinedReducer } from 'redux';

import auth, { type State as AuthState } from './auth';
import notifications, {
	type State as NotificationState,
} from './notification';
import entity, { type State as EntityState } from './entity';

import type { Action } from 'actions';

export type State = {|
	+auth: AuthState,
	+notifications: NotificationState,
	+entity: EntityState,
|};

const reducer: CombinedReducer<State, Action> = combineReducers({
	auth,
	notifications,
	entity,
});

export default reducer;
