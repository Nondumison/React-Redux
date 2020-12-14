// @flow strict

/* eslint-disable consistent-return */
import { normalize, denormalize } from 'jsonapi-normalizer';
import { batch } from 'react-redux';

import type { EntityNames } from 'entity-models';
import type { Entity, NewEntity, Meta, ById } from 'reducers/entity';
import type { Dispatch, GetState } from 'index';
import * as api from 'actions/api';
import * as selectors from 'selectors';

export const FETCH: 'FETCH_ENTITY' = 'FETCH_ENTITY';
export const RECEIVE_SUCCESS: 'RECEIVE_ENTITY_SUCCESS' =
	'RECEIVE_ENTITY_SUCCESS';
export const RECEIVE_ERRORS: 'RECEIVE_ENTITY_ERROR' = 'RECEIVE_ENTITY_ERROR';
export const RECEIVE_META: 'RECEIVE_ENTITY_META' = 'RECEIVE_ENTITY_META';
export const CLEAR: 'CLEAR_ENTITY' = 'CLEAR_ENTITY';
export const CLEAR_ERRORS: 'CLEAR_ERRORS_ENTITY' = 'CLEAR_ERRORS_ENTITY';

type Entities<T: EntityNames> = $ElementType<ById, T>;

type FetchAction<T: EntityNames> = {|
	+type: typeof FETCH,
	+entity: T,
|};

type ReceiveActionSuccess<T: EntityNames> = {|
	+type: typeof RECEIVE_SUCCESS,
	+payload: Entities<T>,
	+entity: T,
|};

type ReceiveActionError<T: EntityNames> = {|
	+type: typeof RECEIVE_ERRORS,
	+payload: $ReadOnlyArray<Error>,
	+entity: T,
|};

type ReceiveMetaAction<T: EntityNames> = {|
	+type: typeof RECEIVE_META,
	+entity: T,
	+payload: $ElementType<Meta, EntityNames>,
|};

type ClearAction<T: EntityNames> = {|
	+type: typeof CLEAR,
	+entity: T,
	+payload: $ReadOnlyArray<string>,
|};

type ClearErrorsAction<T: EntityNames> = {|
	+type: typeof CLEAR_ERRORS,
	+entity: T,
|};

export type Action<T: EntityNames> =
	| FetchAction<T>
	| ReceiveActionSuccess<T>
	| ReceiveActionError<T>
	| ReceiveMetaAction<T>
	| ClearAction<T>
	| ClearErrorsAction<T>;

export const set = <T: EntityNames>(
	entity: T,
	payload: Entities<T>,
): ReceiveActionSuccess<T> => ({
	type: RECEIVE_SUCCESS,
	entity,
	payload,
});

export const setErrors = <T: EntityNames>(
	entity: T,
	payload: $ReadOnlyArray<Error>,
): ReceiveActionError<T> => ({
	type: RECEIVE_ERRORS,
	entity,
	payload,
});

export const setMeta = <T: EntityNames>(
	entity: T,
	payload: $ElementType<Meta, EntityNames>,
): ReceiveMetaAction<T> => ({
	type: RECEIVE_META,
	entity,
	payload,
});

export const clear = <T: EntityNames>(
	entity: T,
	ids: $ReadOnlyArray<string>,
): ClearAction<T> => ({
	type: CLEAR,
	entity,
	payload: ids,
});

export const clearErrors = <T: EntityNames>(
	entity: T,
): ClearErrorsAction<T> => ({
	type: CLEAR_ERRORS,
	entity,
});

export const fetchAll = <T: EntityNames>(
	entity: T,
	config?: api.QueryParams,
): ((Dispatch, GetState) => Promise<Entities<T> | void>) => async (
	dispatch: Dispatch,
	getState: GetState,
) => {
	dispatch({ type: FETCH, entity });
	try {
		const { entities, meta } = normalize(
			await dispatch(api.getAll(entity, config)()),
		);
		batch(() => {
			if (meta != null) {
				dispatch(setMeta(entity, meta));
			}
			Object.entries(entities).forEach(([entity, byId]) => {
				// $FlowIgnore generics have limited scope
				dispatch(set(entity, byId));
			});
		});
		if (entities[entity] != null) {
			return (selectors.entity.getAll(entity, getState()): $DownCast);
		}
	} catch (error) {
		dispatch(setErrors(entity, [].concat(error)));
	}
};

export const fetch = <T: EntityNames>(
	entity: T,
	id: string,
): ((Dispatch, GetState) => Promise<Entity<T> | void>) => async (
	dispatch,
	getState,
) => {
	dispatch({ type: FETCH, entity });
	try {
		const { entities, meta } = normalize(await dispatch(api.get(entity)(id)));
		batch(() => {
			if (meta != null) {
				dispatch(setMeta(entity, meta));
			}
			Object.entries(entities).forEach(([entity, byId]) => {
				// $FlowIgnore generics have limited scope
				dispatch(set(entity, byId));
			});
		});
		if (entities[entity] != null) {
			return (selectors.entity.get(entity, getState(), id): $DownCast);
		}
	} catch (error) {
		dispatch(setErrors(entity, [].concat(error)));
	}
};

export const create = <T: EntityNames>(
	entity: T,
	payload: NewEntity<T>,
): ((Dispatch, GetState) => Promise<Entity<T> | void>) => async (
	dispatch,
	getState,
) => {
	dispatch({ type: FETCH, entity });
	try {
		const { entities, meta } = normalize(
			await dispatch(
				api.create(entity)(
					denormalize({ [entity]: '' }, { [entity]: { '': payload } }),
				),
			),
		);
		batch(() => {
			if (meta != null) {
				dispatch(setMeta(entity, meta));
			}
			Object.entries(entities).forEach(([entity, byId]) => {
				// $FlowIgnore generics have limited scope
				dispatch(set(entity, byId));
			});
		});
		if (entities[entity] != null) {
			return (selectors.entity.get(
				entity,
				getState(),
				Object.keys(entities[entity])[0],
			): $DownCast);
		}
	} catch (error) {
		dispatch(setErrors(entity, [].concat(error)));
	}
};

export const update = <T: EntityNames>(
	entity: T,
	id: string,
	payload: $Shape<Entity<T>>,
): ((Dispatch, GetState) => Promise<Entity<T> | void>) => async (
	dispatch,
	getState,
) => {
	dispatch({ type: FETCH, entity });
	try {
		const { entities, meta } = normalize(
			await dispatch(
				api.update(entity)(
					id,
					denormalize(
						{ [entity]: id },
						{ [entity]: { [id]: { id, ...payload } } },
					),
				),
			),
		);
		batch(() => {
			if (meta != null) {
				dispatch(setMeta(entity, meta));
			}
			Object.entries(entities).forEach(([entity, byId]) => {
				// $FlowIgnore generics have limited scope
				dispatch(set(entity, byId));
			});
		});
		if (entities[entity] != null) {
			return (selectors.entity.get(entity, getState(), id): $DownCast);
		}
	} catch (error) {
		dispatch(setErrors(entity, [].concat(error)));
	}
};

export const remove = <T: EntityNames>(
	entity: T,
	id: string,
): (Dispatch => Promise<boolean>) => async dispatch => {
	await dispatch({ type: FETCH, entity });
	try {
		const { meta } = (await dispatch(api.remove(entity)(id))) || {};
		batch(() => {
			if (meta != null) {
				dispatch(setMeta(entity, meta));
			}
			dispatch(clear(entity, [id]));
		});
		return true;
	} catch (error) {
		dispatch(setErrors(entity, [].concat(error)));
		return false;
	}
};
