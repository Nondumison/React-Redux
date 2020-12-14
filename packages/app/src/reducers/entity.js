// @flow strict

import { combineReducers, type Reducer } from 'redux';

import {
	entityUrls,
	type EntityModels,
	type EntityNames,
} from 'entity-models';
import {
	FETCH,
	RECEIVE_SUCCESS,
	RECEIVE_ERRORS,
	RECEIVE_META,
	CLEAR,
	CLEAR_ERRORS,
	type Action,
} from 'actions/entity';

export type NewEntity<T: EntityNames> = $ReadOnly<
	$ElementType<EntityModels, T>,
>;

export type Entity<T: EntityNames> = $ReadOnly<{|
	+id: string,
	...$ElementType<EntityModels, T>,
|}>;

export type Errors = $ObjMap<EntityModels, () => $ReadOnlyArray<Error>>;

const entities = Object.keys(entityUrls);

const errors = <T: EntityNames>(
	state: Errors | void,
	action: Action<T>,
): Errors => {
	if (state === undefined) {
		// $FlowIgnore inexact object literal is OK here
		return entities.reduce((acc, entity) => ({ ...acc, [entity]: [] }), {});
	}
	switch (action.type) {
		case RECEIVE_ERRORS:
			return {
				...state,
				[action.entity]: action.payload,
			};
		case CLEAR_ERRORS:
			return {
				...state,
				[action.entity]: [],
			};
		default:
			return state;
	}
};

export type Meta = $ObjMap<
	EntityModels,
	() => $Shape<{|
		+total: number,
	|}>,
>;

const meta = <T: EntityNames>(
	state: Meta | void,
	action: Action<T>,
): Meta => {
	if (state === undefined) {
		// $FlowIgnore inexact object literal is OK here
		return entities.reduce((acc, entity) => ({ ...acc, [entity]: {} }), {});
	}
	switch (action.type) {
		case RECEIVE_META:
			return {
				...state,
				[action.entity]: action.payload,
			};
		default:
			return state;
	}
};

export type Loading = $ObjMap<EntityModels, () => boolean>;

const loading = <T: EntityNames>(
	state: Loading | void,
	action: Action<T>,
): Loading => {
	if (state === undefined) {
		// $FlowIgnore inexact object literal is OK here
		return Object.keys(entities).reduce(
			(acc, entity) => ({ ...acc, [entity]: false }),
			{},
		);
	}
	switch (action.type) {
		case FETCH:
			return {
				...state,
				[action.entity]: true,
			};
		case RECEIVE_SUCCESS:
		// Fall through
		case RECEIVE_ERRORS:
			return {
				...state,
				[action.entity]: false,
			};
		default:
			return state;
	}
};

export type AllIds = $ObjMap<EntityModels, () => $ReadOnlyArray<string>>;

const allIds = <T: EntityNames>(
	state: AllIds | void,
	action: Action<T>,
): AllIds => {
	if (state === undefined) {
		// $FlowIgnore inexact object literal is OK here
		return entities.reduce((acc, entity) => ({ ...acc, [entity]: [] }), {});
	}
	switch (action.type) {
		case RECEIVE_SUCCESS:
			return {
				...state,
				[action.entity]: [
					...new Set([
						...state[action.entity],
						...Object.keys(action.payload),
					]),
				],
			};
		case CLEAR:
			return {
				...state,
				[action.entity]: state[action.entity].filter(
					id => !action.payload.includes(id),
				),
			};
		default:
			return state;
	}
};

export type ById = $ObjMap<
	EntityModels,
	<Model>(
		Model,
	) => {
		+[id: string]: $ReadOnly<{|
			+id: string,
			...Model,
		|}>,
	},
>;

const byId = <T: EntityNames>(
	state: ById | void,
	action: Action<T>,
): ById => {
	if (state === undefined) {
		// $FlowIgnore inexact object literal is OK here
		return entities.reduce((acc, entity) => ({ ...acc, [entity]: {} }), {});
	}
	switch (action.type) {
		case RECEIVE_SUCCESS:
			return {
				...state,
				[action.entity]: {
					...state[action.entity],
					...action.payload,
				},
			};
		case CLEAR:
			return {
				...state,
				[action.entity]: Object.entries(state[action.entity])
					.filter(([id]) => !action.payload.includes(id))
					.reduce(
						(acc, [id, obj]) => ({
							...acc,
							[id]: obj,
						}),
						{},
					),
			};
		default:
			return state;
	}
};

export type State = {|
	+errors: Errors,
	+meta: Meta,
	+loading: Loading,
	+allIds: AllIds,
	+byId: ById,
|};

const reducer: Reducer<State, Action<EntityNames>> = combineReducers({
	errors,
	meta,
	loading,
	allIds,
	byId,
});

export default reducer;
