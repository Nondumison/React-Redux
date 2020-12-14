import {
	FETCH,
	RECEIVE,
	CLEAR,
	CLEAR_ERRORS,
	set,
	clear,
	clearErrors,
	login,
	reAuthorize,
	recoverPassword,
	updatePassword,
	initializeUser,
} from './auth';

import { getState, dispatch, subscribe, history } from 'test-utils/redux';
import * as api from 'actions/api';
import * as entityActions from 'actions/entity';

jest.mock('actions/api');
jest.mock('actions/entity');

beforeEach(() => {
	entityActions.fetch.mockClear();
	subscribe.mockClear();
	getState.mockClear();
	dispatch.mockClear();
});

it(`dispatches a ${RECEIVE} action with payload on set() with data`, async () => {
	await dispatch(
		set({
			token: 'test',
			userId: 'c3098076-974f-47e5-a96a-bf6006ca1f5a',
		}),
	);
	expect(dispatch).toHaveBeenCalledWith({
		type: RECEIVE,
		payload: {
			token: 'test',
			userId: 'c3098076-974f-47e5-a96a-bf6006ca1f5a',
		},
	});
});

it(`dispatches a ${RECEIVE} action with errors payload on set() with errors`, async () => {
	await dispatch(set([new Error('Humpty Dumpty fell off a wall')]));
	expect(dispatch).toHaveBeenCalledWith({
		type: RECEIVE,
		payload: [new Error('Humpty Dumpty fell off a wall')],
		error: true,
	});
});

it(`dispatches a ${CLEAR} action on clear()`, async () => {
	await dispatch(clear());
	expect(dispatch).toHaveBeenCalledWith({
		type: CLEAR,
	});
});

it(`dispatches a ${CLEAR_ERRORS} action on clearErrors()`, async () => {
	await dispatch(clearErrors());
	expect(dispatch).toHaveBeenCalledWith({
		type: CLEAR_ERRORS,
	});
});

it(`dispatches ${FETCH} & ${RECEIVE} actions in login() thunk`, async () => {
	await dispatch(login('john@doe.com', '12345678'));
	expect(dispatch).toHaveBeenCalledWith({
		type: FETCH,
	});
	expect(dispatch.mock.calls[3][0]).toMatchObject({
		type: RECEIVE,
	});
});

it(`calls api.login() in login() thunk`, async () => {
	await dispatch(login('john@doe.com', '12345678'));
	expect(api.login).toHaveBeenCalled();
});

it(`dispatches a ${CLEAR} action in reAuthorize() thunk`, async () => {
	await dispatch(reAuthorize());
	expect(dispatch).toHaveBeenCalledWith({
		type: CLEAR,
	});
});

it(`dispatches a ${FETCH} action in recoverPassword() thunk`, async () => {
	await dispatch(recoverPassword('john@doe.com'));
	expect(dispatch).toHaveBeenCalledWith({
		type: FETCH,
	});
});

it(`dispatches a ${FETCH} action in updatePassword() thunk`, async () => {
	await dispatch(updatePassword('newPassword', 'token'));
	expect(dispatch).toHaveBeenCalledWith({
		type: FETCH,
	});
});
it(`dispatches a history replace action in reAuthorize() thunk`, async () => {
	const replace = jest.spyOn(history, 'replace');
	await dispatch(reAuthorize());
	expect(replace).toHaveBeenCalled();
});

describe('Attempt to Initialize user', () => {
	it('Initialize user when there is a user ID', async () => {
		await dispatch(initializeUser());
		expect(entityActions.fetch).toHaveBeenCalledWith(
			'user',
			'aeb4e529-8925-4ecd-afd2-c69ac0eaef2b',
		);
	});

	it("Doesn't run when there is no user ID", async () => {
		getState.mockImplementationOnce(() => ({
			auth: { token: 'test' },
		}));
		await dispatch(initializeUser());
		expect(entityActions.fetch).not.toHaveBeenCalledWith('user');
	});
});
