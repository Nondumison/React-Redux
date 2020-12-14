// @flow strict

import * as fromAuth from './auth';
import * as fromNotification from './notification';
import * as fromEntity from './entity';

import type { State } from 'reducers';
import type { EntityNames } from 'entity-models';
import type {
	Entity,
	Loading as EntityLoading,
	AllIds as EntityAllIds,
	ById as EntityById,
	Errors as EntityErrors,
	Meta as EntityMeta,
} from 'reducers/entity';

export const auth = {
	isLoading: (state: State) => fromAuth.isLoading(state.auth),
	getToken: (state: State) => fromAuth.getToken(state.auth),
	getErrors: (state: State) => fromAuth.getErrors(state.auth),
	getUserId: (state: State) => fromAuth.getUserId(state.auth),
	getRoleId: (state: State) => fromAuth.getRoleId(state.auth),
};

export const notification = {
	getIds: (state: State) => fromNotification.getIds(state.notifications),
	get: (state: State, id: string) =>
		fromNotification.get(state.notifications, id),
	getAll: (state: State) => fromNotification.getAll(state.notifications),
};

type EntitySelectors = {|
	isLoading: <T: EntityNames>(
		entity: T,
		State,
	) => $ElementType<EntityLoading, T>,
	getErrors: <T: EntityNames>(
		entity: T,
		State,
	) => $ElementType<EntityErrors, T>,
	getIds: <T: EntityNames>(entity: T, State) => $ElementType<EntityAllIds, T>,
	getMeta: <T: EntityNames>(entity: T, State) => $ElementType<EntityMeta, T>,
	getAll: <T: EntityNames>(entity: T, State) => $ElementType<EntityById, T>,
	get: <T: EntityNames>(entity: T, State, id: string) => Entity<T> | void,
|};

export const entity: EntitySelectors = {
	isLoading: (e, state) => fromEntity.isLoading(e, state.entity),
	getErrors: (e, state) => fromEntity.getErrors(e, state.entity),
	getIds: (e, state) => fromEntity.getIds(e, state.entity),
	getMeta: (e, state) => fromEntity.getMeta(e, state.entity),
	getAll: (e, state) => fromEntity.getAll(e, state.entity),
	get: (e, state, id) => (fromEntity.get(e, state.entity, id): $DownCast),
};
