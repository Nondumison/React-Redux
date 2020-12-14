import { RECEIVE, CLEAR, set, clear, notify } from './notification';

import { getState, dispatch, subscribe } from 'test-utils/redux';

beforeEach(() => {
	subscribe.mockClear();
	getState.mockClear();
	dispatch.mockClear();
});

it(`dispatches a ${RECEIVE} action with payload on set() with data`, async () => {
	await dispatch(
		set({
			id: '1',
			message: 'test',
			type: 'success',
		}),
	);
	expect(dispatch).toHaveBeenCalledWith({
		type: RECEIVE,
		payload: {
			id: '1',
			message: 'test',
			type: 'success',
		},
	});
});

it(`dispatches a ${CLEAR} action on clear()`, async () => {
	await dispatch(clear(['1']));
	expect(dispatch).toHaveBeenCalledWith({
		type: CLEAR,
		payload: ['1'],
	});
});

it(`dispatches ${RECEIVE} & ${CLEAR} actions in notify() thunk`, async () => {
	const id = await dispatch(
		notify({
			message: 'test',
			type: 'success',
		}),
	);

	expect(dispatch).toHaveBeenCalledWith({
		type: RECEIVE,
		payload: {
			id,
			message: 'test',
			type: 'success',
		},
	});

	expect(dispatch.mock.calls[2][0].type).toBe(CLEAR);
	expect(dispatch.mock.calls[2][0].payload).toEqual(expect.any(Array));
});
