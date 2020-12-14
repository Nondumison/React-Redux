// @flow strict

import type { EntityNames } from 'entity-models';
import type {
	State,
	Entity,
	Errors,
	Meta,
	Loading,
	AllIds,
	ById,
} from 'reducers/entity';

export const isLoading = <T: EntityNames>(
	entity: T,
	state: State,
): $ElementType<Loading, T> => state.loading[entity];

export const getErrors = <T: EntityNames>(
	entity: T,
	state: State,
): $ElementType<Errors, T> => state.errors[entity];

export const getIds = <T: EntityNames>(
	entity: T,
	state: State,
): $ElementType<AllIds, T> => state.allIds[entity];

export const getMeta = <T: EntityNames>(
	entity: T,
	state: State,
): $ElementType<Meta, T> => state.meta[entity];

export const getAll = <T: EntityNames>(
	entity: T,
	state: State,
): $ElementType<ById, T> => state.byId[entity];

export const get = <T: EntityNames>(
	entity: T,
	state: State,
	id: string,
): Entity<T> | void => (state.byId[entity][id]: $DownCast);
