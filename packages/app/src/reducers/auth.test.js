import reducer from './auth';

import { FETCH, RECEIVE, CLEAR, CLEAR_ERRORS } from 'actions/auth';

it(`should handle ${FETCH}`, () => {
	const action = {
		type: FETCH,
	};
	const state = reducer(undefined, action);

	expect(state).toMatchObject({
		loading: true,
		errors: [],
		token: null,
		userId: null,
	});
});

it(`should handle ${RECEIVE}`, () => {
	const action = {
		type: RECEIVE,
		payload: {
			token: 'test',
			userId: '5a1821a7c819ca1f55ab4003',
		},
		error: false,
	};
	const state = reducer(
		{
			loading: true,
			errors: [new Error('Humpty Dumpty fell off the wall')],
			token: null,
			userId: null,
		},
		action,
	);

	expect(state).toMatchObject({
		loading: false,
		errors: [],
		token: 'test',
		userId: '5a1821a7c819ca1f55ab4003',
	});
});

it(`should handle ${CLEAR}`, () => {
	const action = { type: CLEAR };
	const state = reducer(
		{
			loading: true,
			errors: [],
			token: 'test',
			userId: '5a1821a7c819ca1f55ab4003',
		},
		action,
	);

	expect(state).toMatchObject({
		loading: true,
		errors: [],
		token: null,
		userId: null,
	});
});

it(`should handle ${CLEAR_ERRORS}`, () => {
	const action = { type: CLEAR_ERRORS };
	const state = reducer(
		{
			loading: true,
			errors: [new Error('Humpty Dumpty fell off the wall')],
			token: 'test',
			userId: '5a1821a7c819ca1f55ab4003',
		},
		action,
	);

	expect(state).toMatchObject({
		loading: true,
		errors: [],
		token: 'test',
		userId: '5a1821a7c819ca1f55ab4003',
	});
});
