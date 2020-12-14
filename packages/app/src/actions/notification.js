// @flow strict

import hash from 'object-hash';

import * as selectors from 'selectors';
import type { Notification } from 'reducers/notification';
import type { Dispatch, GetState } from 'index';

export const RECEIVE: 'RECEIVE_NOTIFICATION' = 'RECEIVE_NOTIFICATION';
export const CLEAR: 'CLEAR_NOTIFICATION' = 'CLEAR_NOTIFICATION';

type ClearPayload = $ReadOnlyArray<string>;

type ReceiveAction = {|
	+type: typeof RECEIVE,
	+payload: Notification,
|};

type ClearAction = {|
	+type: typeof CLEAR,
	+payload: ClearPayload,
|};

export type Action = ReceiveAction | ClearAction;

export const set = (payload: Notification): ReceiveAction => ({
	type: RECEIVE,
	payload,
});

export const clear = (ids: ClearPayload): ClearAction => ({
	type: CLEAR,
	payload: ids,
});

export const notify = (
	notification: $Diff<Notification, {| +id: string |}>,
) => (dispatch: Dispatch, getState: GetState) => {
	const id = hash(notification);
	const overflowNotificationIds = selectors.notification
		.getIds(getState())
		.slice(0, -4);
	dispatch(set({ ...notification, id }));
	dispatch(clear(overflowNotificationIds));
	return id;
};
