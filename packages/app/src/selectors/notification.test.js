import { getIds, get, getAll } from './notification';

import { getState } from 'test-utils/redux';

const state = getState().notifications;
const ids = Object.keys(state.byId);

it('selects the ids', () => {
	expect(getIds(state)).toEqual(ids);
});

it('selects an entity by id', () => {
	expect(get(state, ids[0])).toMatchObject(state.byId[ids[0]]);
});

it('selects all entities', () => {
	expect(getAll(state)).toMatchObject(state.byId);
});
