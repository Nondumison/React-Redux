import { isLoading, getToken, getErrors, getUserId } from './auth';

import { getState } from 'test-utils/redux';

const state = getState().auth;

it('selects the loading state', () => {
	expect(isLoading(state)).toBe(false);
});

it('selects the token', () => {
	expect(getToken(state)).toBe('token');
});

it('selects the errors', () => {
	expect(getErrors(state)).toMatchObject([]);
});

it('selects the user id', () => {
	expect(getUserId(state)).toBe('aeb4e529-8925-4ecd-afd2-c69ac0eaef2b');
});
