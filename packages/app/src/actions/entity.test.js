import {
	FETCH,
	RECEIVE_SUCCESS,
	RECEIVE_ERRORS,
	RECEIVE_META,
	CLEAR,
	CLEAR_ERRORS,
	set,
	setErrors,
	setMeta,
	clear,
	clearErrors,
	fetchAll,
	fetch,
	create,
	update,
	remove,
} from './entity';

import { getState, dispatch, subscribe } from 'test-utils/redux';
import * as api from 'actions/api';

jest.mock('myHistory');
jest.mock('actions/api');

beforeEach(() => {
	api.getAll.mockClear();
	api.get.mockClear();
	subscribe.mockClear();
	getState.mockClear();
	dispatch.mockClear();
});

it(`dispatches a ${RECEIVE_SUCCESS} action with payload on set() with data`, async () => {
	await dispatch(
		set('user', {
			'c3098076-974f-47e5-a96a-bf6006ca1f5a': {
				id: 'c3098076-974f-47e5-a96a-bf6006ca1f5a',
				firstName: 'John',
				lastName: 'Smith',
				email: 'john.smith@example.com',
			},
		}),
	);
	expect(dispatch).toHaveBeenCalledWith({
		type: RECEIVE_SUCCESS,
		entity: 'user',
		payload: {
			'c3098076-974f-47e5-a96a-bf6006ca1f5a': {
				id: 'c3098076-974f-47e5-a96a-bf6006ca1f5a',
				firstName: 'John',
				lastName: 'Smith',
				email: 'john.smith@example.com',
			},
		},
	});
});

it(`dispatches a ${RECEIVE_ERRORS} action with errors payload on setErrors()`, async () => {
	await dispatch(
		setErrors('user', [new Error('Humpty Dumpty fell off a wall')]),
	);
	expect(dispatch).toHaveBeenCalledWith({
		type: RECEIVE_ERRORS,
		entity: 'user',
		payload: [new Error('Humpty Dumpty fell off a wall')],
	});
});

it(`dispatches a ${RECEIVE_META} action with errors payload on setMeta()`, async () => {
	await dispatch(setMeta('user', { total: 1 }));
	expect(dispatch).toHaveBeenCalledWith({
		type: RECEIVE_META,
		entity: 'user',
		payload: {
			total: 1,
		},
	});
});

it(`dispatches a ${CLEAR} action on clear()`, async () => {
	await dispatch(clear('user'));
	expect(dispatch).toHaveBeenCalledWith({
		type: CLEAR,
		entity: 'user',
	});
});

it(`dispatches a ${CLEAR_ERRORS} action on clearErrors()`, async () => {
	await dispatch(clearErrors('user'));
	expect(dispatch).toHaveBeenCalledWith({
		type: CLEAR_ERRORS,
		entity: 'user',
	});
});

it(`dispatches ${FETCH} & ${RECEIVE_SUCCESS} actions in fetchAll() thunk`, async () => {
	await dispatch(fetchAll('user'));
	expect(dispatch).toHaveBeenCalledWith({
		type: FETCH,
		entity: 'user',
	});
	expect(dispatch.mock.calls[3][0]).toMatchObject({
		type: RECEIVE_SUCCESS,
		entity: 'user',
	});
});

it(`calls api.getAll() in fetchAll() thunk`, async () => {
	await dispatch(fetchAll('user'));
	expect(api.getAll).toHaveBeenCalled();
});

it(`dispatches ${FETCH} & ${RECEIVE_SUCCESS} actions in fetch() thunk`, async () => {
	await dispatch(fetch('user', 'c3098076-974f-47e5-a96a-bf6006ca1f5a'));
	expect(dispatch).toHaveBeenCalledWith({
		type: FETCH,
		entity: 'user',
	});
	expect(dispatch.mock.calls[3][0]).toMatchObject({
		type: RECEIVE_SUCCESS,
		entity: 'user',
	});
});

it(`calls api.get() in fetch() thunk`, async () => {
	await dispatch(fetch('user', 'c3098076-974f-47e5-a96a-bf6006ca1f5a'));
	expect(api.get).toHaveBeenCalled();
});

it(`dispatches ${FETCH} & ${RECEIVE_SUCCESS} actions in create() thunk`, async () => {
	await dispatch(
		create('user', {
			id: 'c3098076-974f-47e5-a96a-bf6006ca1f5a',
			firstName: 'John',
			lastName: 'Smith',
			email: 'john.smith@example.com',
		}),
	);
	expect(dispatch).toHaveBeenCalledWith({
		type: FETCH,
		entity: 'user',
	});
	expect(dispatch.mock.calls[3][0]).toMatchObject({
		type: RECEIVE_SUCCESS,
		entity: 'user',
	});
});

it(`calls api.create() in create() thunk`, async () => {
	await dispatch(
		create('user', {
			id: 'c3098076-974f-47e5-a96a-bf6006ca1f5a',
			firstName: 'John',
			lastName: 'Smith',
			email: 'john.smith@example.com',
		}),
	);
	expect(api.create).toHaveBeenCalled();
});

it(`dispatches ${FETCH} & ${RECEIVE_SUCCESS} actions in update() thunk`, async () => {
	await dispatch(
		update('user', 'c3098076-974f-47e5-a96a-bf6006ca1f5a', {
			firstName: 'Alice',
		}),
	);
	expect(dispatch).toHaveBeenCalledWith({
		type: FETCH,
		entity: 'user',
	});
	expect(dispatch.mock.calls[3][0]).toMatchObject({
		type: RECEIVE_SUCCESS,
		entity: 'user',
	});
});

it(`calls api.update() in update() thunk`, async () => {
	await dispatch(
		update('user', 'c3098076-974f-47e5-a96a-bf6006ca1f5a', {
			firstName: 'Alice',
		}),
	);
	expect(api.update).toHaveBeenCalled();
});

it(`dispatches ${FETCH} & ${CLEAR} actions in remove() thunk`, async () => {
	await dispatch(remove('user', 'c3098076-974f-47e5-a96a-bf6006ca1f5a'));
	expect(dispatch).toHaveBeenCalledWith({
		type: FETCH,
		entity: 'user',
	});
	expect(dispatch.mock.calls[3][0]).toMatchObject({
		type: CLEAR,
		entity: 'user',
	});
});

it(`calls api.remove() in remove() thunk`, async () => {
	await dispatch(remove('user', 'c3098076-974f-47e5-a96a-bf6006ca1f5a'));
	expect(api.remove).toHaveBeenCalled();
});
