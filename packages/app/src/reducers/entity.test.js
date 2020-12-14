import reducer from './entity';

import {
	FETCH,
	RECEIVE_SUCCESS,
	RECEIVE_ERRORS,
	RECEIVE_META,
	CLEAR,
	CLEAR_ERRORS,
} from 'actions/entity';

const emptyState = reducer();

const entityState = (initialState, entity, state) =>
	Object.keys(state).reduce(
		(acc, slice) => ({
			...acc,
			[slice]: {
				...acc[slice],
				[entity]: state[slice],
			},
		}),
		initialState,
	);

it(`should handle ${FETCH}`, () => {
	const action = {
		type: FETCH,
		entity: 'user',
	};
	const state = reducer(emptyState, action);

	expect(state).toMatchObject(
		entityState(emptyState, 'user', { loading: true }),
	);
});

it(`should handle ${RECEIVE_SUCCESS}`, () => {
	const action = {
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
	};
	const state = reducer(emptyState, action);

	expect(state).toMatchObject(
		entityState(emptyState, 'user', {
			byId: {
				'c3098076-974f-47e5-a96a-bf6006ca1f5a': {
					id: 'c3098076-974f-47e5-a96a-bf6006ca1f5a',
					firstName: 'John',
					lastName: 'Smith',
					email: 'john.smith@example.com',
				},
			},
			allIds: ['c3098076-974f-47e5-a96a-bf6006ca1f5a'],
		}),
	);
});

it(`should handle ${RECEIVE_ERRORS}`, () => {
	const action = {
		type: RECEIVE_ERRORS,
		entity: 'user',
		payload: [new Error('Humpty Dumpty fell off a wall')],
	};
	const state = reducer(emptyState, action);

	expect(state).toMatchObject(
		entityState(emptyState, 'user', {
			errors: [new Error('Humpty Dumpty fell off a wall')],
		}),
	);
});

it(`should handle ${RECEIVE_META}`, () => {
	const action = {
		type: RECEIVE_META,
		entity: 'user',
		payload: { total: 1 },
	};
	const state = reducer(emptyState, action);

	expect(state).toMatchObject(
		entityState(emptyState, 'user', {
			meta: { total: 1 },
		}),
	);
});

it(`should handle ${CLEAR}`, () => {
	const initialState = entityState(emptyState, 'user', {
		byId: {
			'c3098076-974f-47e5-a96a-bf6006ca1f5a': {
				id: 'c3098076-974f-47e5-a96a-bf6006ca1f5a',
				firstName: 'John',
				lastName: 'Smith',
				email: 'john.smith@example.com',
			},
		},
		allIds: ['c3098076-974f-47e5-a96a-bf6006ca1f5a'],
	});

	const action = {
		type: CLEAR,
		entity: 'user',
		payload: ['c3098076-974f-47e5-a96a-bf6006ca1f5a'],
	};
	const state = reducer(initialState, action);

	expect(state).toMatchObject(
		entityState(initialState, 'user', {
			byId: {},
			allIds: [],
		}),
	);
});

it(`should handle ${CLEAR_ERRORS}`, () => {
	const initialState = entityState(emptyState, 'user', {
		errors: [new Error('Humpty Dumpty fell off a wall')],
	});

	const action = {
		type: CLEAR_ERRORS,
		entity: 'user',
		payload: ['c3098076-974f-47e5-a96a-bf6006ca1f5a'],
	};
	const state = reducer(initialState, action);

	expect(state).toMatchObject(
		entityState(initialState, 'user', {
			errors: [],
		}),
	);
});
