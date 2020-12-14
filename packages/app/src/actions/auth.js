// @flow strict

/* eslint-disable consistent-return */

import type { RouterHistory } from 'react-router-dom';

import { notify } from 'actions/notification';
import * as api from 'actions/api';
import * as entityActions from 'actions/entity';
import * as selectors from 'selectors';
import type { Token, UserID, RoleID } from 'reducers/auth';
import type { Dispatch, GetState, Subscribe } from 'index';

export const FETCH: 'FETCH_AUTH' = 'FETCH_AUTH';
export const RECEIVE: 'RECEIVE_AUTH' = 'RECEIVE_AUTH';
export const CLEAR: 'CLEAR_AUTH' = 'CLEAR_AUTH';
export const CLEAR_ERRORS: 'CLEAR_AUTH_ERRORS' = 'CLEAR_AUTH_ERRORS';

type FetchAction = {|
	+type: typeof FETCH,
|};

type ReceivePayload = {|
	+token?: $NonMaybeType<Token>,
	+userId?: $NonMaybeType<UserID>,
	+roleId?: $NonMaybeType<RoleID>,
|};

type ReceiveAction =
	| {|
			+type: typeof RECEIVE,
			+payload: ReceivePayload,
			+error?: false,
	  |}
	| {|
			+type: typeof RECEIVE,
			+payload: $ReadOnlyArray<Error>,
			+error: true,
	  |};

type ClearAction = {|
	+type: typeof CLEAR,
|};

type ClearErrorsAction = {|
	+type: typeof CLEAR_ERRORS,
|};

export type Action =
	| FetchAction
	| ReceiveAction
	| ClearAction
	| ClearErrorsAction;

const isLoading = (): FetchAction => ({
	type: FETCH,
});

export const set = (
	payload: ReceivePayload | $ReadOnlyArray<Error>,
): ReceiveAction =>
	!Array.isArray(payload)
		? {
				type: RECEIVE,
				payload,
		  }
		: {
				type: RECEIVE,
				payload,
				error: true,
		  };

export const clear = (): ClearAction => ({
	type: CLEAR,
});

export const clearErrors = (): ClearErrorsAction => ({
	type: CLEAR_ERRORS,
});

export const setRole = (roleId: $PropertyType<ReceivePayload, 'roleId'>) =>
	set({ roleId });

export const updatePassword = (password: string, token: string) => async (
	dispatch: Dispatch,
) => {
	try {
		dispatch(isLoading());
		const {
			meta: { message },
		} = await dispatch(api.updatePassword(password, token));
		if (message != null) {
			dispatch(
				notify({
					type: 'info',
					message,
				}),
			);
		}
	} catch (error) {
		dispatch(set([].concat(error)));
	}
};

export const recoverPassword = (email: string) => async (
	dispatch: Dispatch,
) => {
	try {
		dispatch(isLoading());
		const {
			meta: { message },
		} = await dispatch(api.recoverPassword(email));
		if (message != null) {
			dispatch(
				notify({
					type: 'info',
					message,
				}),
			);
		}
	} catch (error) {
		dispatch(set([].concat(error)));
	}
};

export const initializeUser = () => (
	dispatch: Dispatch,
	getState: GetState,
) => {
	const state = getState();
	const userId = selectors.auth.getUserId(state);

	if (userId == null) return undefined;

	// Fetch all user details
	return dispatch(entityActions.fetch<'user'>('user', userId));
};

export const login = (username: string, password: string) => async (
	dispatch: Dispatch,
) => {
	try {
		dispatch(isLoading());
		const { data } = await dispatch(api.login(username, password));
		dispatch(set(data));
		return dispatch(initializeUser());
	} catch (error) {
		dispatch(set([].concat(error)));
	}
};

export const reAuthorize = () => async (
	dispatch: Dispatch,
	getState: GetState,
	subscribe: Subscribe,
	{ history }: { history: RouterHistory },
) => {
	dispatch(clear());
	history.replace(`/login${history.location.pathname || ''}`);

	// eslint-disable-next-line promise/avoid-new
	await new Promise(resolve => {
		const unsubscribe = subscribe(() => {
			if (selectors.auth.getToken(getState()) != null) {
				unsubscribe();
				resolve();
			}
		});
	});
};
