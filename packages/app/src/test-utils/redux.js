// @flow strict

import { createMemoryHistory } from 'history';
import type { RouterHistory } from 'react-router-dom';

import type { State } from 'reducers';
import type { Action } from 'actions';
import type { Dispatch, GetState, Subscribe } from 'index';

export const state = {
	auth: {
		errors: [],
		loading: false,
		token: 'token',
		userId: 'aeb4e529-8925-4ecd-afd2-c69ac0eaef2b',
		roleId: '1beb6bab-d26f-4160-b514-b7d8408d8807',
	},
	notifications: {
		byId: {
			'34efda9d-4ab2-4657-a55d-e685248fddb2': {
				id: '34efda9d-4ab2-4657-a55d-e685248fddb2',
				message: 'foo',
				type: 'info',
			},
		},
		allIds: ['34efda9d-4ab2-4657-a55d-e685248fddb2'],
	},
	entity: {
		errors: {
			user: [],
			role: [],
			foo: [],
			bar: [],
		},
		loading: {
			user: false,
			role: false,
			foo: false,
			bar: false,
		},
		byId: {
			user: {
				'aeb4e529-8925-4ecd-afd2-c69ac0eaef2b': {
					id: 'aeb4e529-8925-4ecd-afd2-c69ac0eaef2b',
					email: 'alice@example.com',
					firstName: 'Alice',
					lastName: 'Smith',
				},
			},
			role: {
				'1beb6bab-d26f-4160-b514-b7d8408d8807': {
					id: '1beb6bab-d26f-4160-b514-b7d8408d8807',
					name: 'super',
				},
			},
			foo: {
				'ad7e9300-c41d-11e9-821e-a570e9682423': {
					id: 'ad7e9300-c41d-11e9-821e-a570e9682423',
					userName: 'Jack',
					favColor: 'Black',
				},
			},
			bar: {
				'ad7e9300-c41d-11e9-821e-a570e9682423': {
					id: 'ad7e9300-c41d-11e9-821e-a570e9682423',
					name: 'John',
					location: 'Johannesburg',
				},
			},
		},
		allIds: {
			user: ['aeb4e529-8925-4ecd-afd2-c69ac0eaef2b'],
			role: ['1beb6bab-d26f-4160-b514-b7d8408d8807'],
			foo: ['ad7e9300-c41d-11e9-821e-a570e9682423'],
			bar: ['ad7e9300-c41d-11e9-821e-a570e9682423'],
		},
		meta: {
			user: {},
			role: {},
			foo: {},
			bar: {},
		},
	},
};

export const getState = jest.fn<[], State>(() => state);

export const subscribe = jest.fn<[() => void], () => void>(callback => {
	setTimeout(callback, 0);
	return () => {};
});

export const history = ((createMemoryHistory(): $DownCast): RouterHistory);

export const dispatch = ((jest.fn(
	(
		action:
			| Action
			| ((
					Dispatch,
					GetState,
					Subscribe,
					{ history: RouterHistory },
			  ) => mixed),
	) => {
		if (typeof action === 'function') {
			// $FlowFixMe currently it’s impossible to type this dispatch *mock* function correctly
			return action(dispatch, getState, subscribe, { history });
		}
		return action;
	},
): $DownCast): JestMockFn<[Action], Action> &
	JestMockFn<[() => mixed], mixed>);
