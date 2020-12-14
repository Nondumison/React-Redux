import { isLoading, getErrors, getIds, getMeta, getAll, get } from './entity';

import { getState } from 'test-utils/redux';

const state = getState().entity;

it('selects the loading state', () => {
	expect(isLoading('user', state)).toBe(false);
});

it('selects the error state', () => {
	expect(getErrors('user', state)).toMatchObject([]);
});

it('selects the ids', () => {
	expect(getIds('user', state)).toMatchObject([
		'aeb4e529-8925-4ecd-afd2-c69ac0eaef2b',
	]);
});

it('selects the meta', () => {
	expect(getMeta('user', state)).toMatchObject({});
});

it('selects all', () => {
	expect(getAll('user', state)).toMatchObject({
		'aeb4e529-8925-4ecd-afd2-c69ac0eaef2b': {
			id: 'aeb4e529-8925-4ecd-afd2-c69ac0eaef2b',
			email: 'alice@example.com',
			firstName: 'Alice',
			lastName: 'Smith',
		},
	});
});

it('selects specific', () => {
	expect(
		get('user', state, 'aeb4e529-8925-4ecd-afd2-c69ac0eaef2b'),
	).toMatchObject({
		id: 'aeb4e529-8925-4ecd-afd2-c69ac0eaef2b',
		email: 'alice@example.com',
		firstName: 'Alice',
		lastName: 'Smith',
	});
});
