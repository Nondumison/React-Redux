// @flow strict

import configureStore from 'configureStore';
import * as selectors from 'selectors';
import * as entitySelectors from 'selectors/entity';
import * as actions from 'actions';
import * as entityActions from 'actions/entity';
import reducer, { type State } from 'reducers';
import type { EntityNames } from 'entity-models';
import entityReducer, {
	type State as EntityState,
	type NewEntity,
} from 'reducers/entity';

(((null: $DownCast): NewEntity<'user'>): {
	+firstName: string,
	+lastName: string,
	+email: string,
});

const store = configureStore();
const state = store.getState();

// Selectors type test

(selectors.entity.isLoading('user', state): boolean);
(entitySelectors.isLoading('user', state.entity): boolean);

(selectors.entity.getErrors('user', state): $ReadOnlyArray<Error>);
(entitySelectors.getErrors('user', state.entity): $ReadOnlyArray<Error>);

(selectors.entity.getMeta('user', state): { +total: number });
(entitySelectors.getMeta('user', state.entity): { +total: number });

(selectors.entity.getIds('user', state): $ReadOnlyArray<string>);
(entitySelectors.getIds('user', state.entity): $ReadOnlyArray<string>);

(selectors.entity.getAll('user', state): {
	+[id: string]: { +firstName: string },
});
(entitySelectors.getAll('user', state.entity): {
	+[id: string]: { +firstName: string },
});

(selectors.entity.get('user', state, '1'): { +firstName: string } | void);

(entitySelectors.get('user', state.entity, '1'): {
	+firstName: string,
} | void);

// Actions type test

entityActions.set('user', {
	'1': {
		id: '1',
		firstName: 'string',
		lastName: 'string',
		email: 'string',
	},
});

(async () => {
	const res = await store.dispatch(entityActions.fetchAll('user'));

	if (res != null) {
		// eslint-disable-next-line flowtype/no-unused-expressions
		res['1'].firstName;
	}

	(await store.dispatch(entityActions.fetch('user', '1')): {
		+firstName: string,
	} | void);

	(await store.dispatch(
		entityActions.create('user', {
			firstName: 'string',
			lastName: 'string',
			email: 'string',
		}),
	): {
		+firstName: string,
	} | void);

	(await store.dispatch(
		entityActions.update('user', '1', { firstName: 'string' }),
	): {
		+firstName: string,
	} | void);

	(await store.dispatch(entityActions.remove('user', '1')): boolean);
})();

// Reducers type tests

(reducer(undefined, ((null: $DownCast): actions.Action)): State);

(entityReducer(
	undefined,
	((null: $DownCast): entityActions.Action<EntityNames>),
): EntityState);
