import { RECEIVE, CLEAR } from 'actions/notification';
import reducer from 'reducers/notification';

it(`should handle ${RECEIVE}`, () => {
	const action = {
		type: RECEIVE,
		payload: {
			id: '123',
			message: 'test',
			type: 'info',
		},
	};
	const state = reducer(
		{
			byId: {},
			allIds: [],
		},
		action,
	);

	expect(state).toMatchObject({
		byId: {
			'123': {
				id: '123',
				message: 'test',
				type: 'info',
			},
		},
		allIds: ['123'],
	});
});

it(`should handle ${CLEAR}`, () => {
	const action = {
		type: CLEAR,
		payload: ['123'],
	};
	const state = reducer(
		{
			byId: {
				'123': {
					id: '123',
					message: 'test',
					type: 'info',
				},
			},
			allIds: ['123'],
		},
		action,
	);

	expect(state).toMatchObject({
		byId: {},
		allIds: [],
	});
});
