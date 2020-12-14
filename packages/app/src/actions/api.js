// @flow strict

import { curry } from 'lodash';
import buildQuery from 'with-query';

import { notify } from 'actions/notification';
import * as authActions from 'actions/auth';
import * as selectors from 'selectors';
import type {
	JSONAPIError,
	JSONAPIMetaDocument,
	JSONAPIDataDocument,
	JSONAPIErrorDocument,
} from 'type-utils/json-api';
import type { Dispatch, GetState } from 'index';
import { entityUrls, type EntityNames } from 'entity-models';

const LOGIN_ENDPOINT = '/authentication';
const AUTH_MANAGEMENT = '/authmanagement';
export const STATIC = '/static/';

if (process.env.REACT_APP_API_HOST == null) {
	throw new Error('REACT_APP_API_HOST missing');
}
if (process.env.REACT_APP_API_ROOT_PATH == null) {
	throw new Error('REACT_APP_API_ROOT_PATH missing');
}

export const API_ROOT =
	process.env.REACT_APP_API_HOST + process.env.REACT_APP_API_ROOT_PATH;

type Token = ?string;

const addHeaders = (
	token: Token,
	configHeaders?: HeadersInit,
): HeadersInit => {
	const headers = new Headers(configHeaders);

	// Set default headers
	if (!headers.has('Accept')) {
		headers.set('Accept', 'application/vnd.api+json');
	}

	if (!headers.has('Content-Type')) {
		headers.set('Content-Type', 'application/vnd.api+json');
	}

	if (token != null) {
		headers.set('Authorization', `Bearer ${token}`);
	}

	return headers;
};

const formatErrors = (errors: $ReadOnlyArray<JSONAPIError>) =>
	errors.map(
		({ title = '', detail = '' }) => new Error(`${title}\n${detail}`.trim()),
	);

export type QueryParams = $Shape<{|
	// $FlowIgnore please see https://docs.feathersjs.com/api/databases/querying.html for possible options
	+filter: { +[string]: any },
	+page: $Shape<{|
		+offset: number,
		+limit: number,
	|}>,
	+sort: $ReadOnlyArray<string>,
	+include: $ReadOnlyArray<string>,
	+fields: { +[entityName: string]: $ReadOnlyArray<string> },
	+action: 'reset' | 'reset-confirm',
	+option: 'generate',
|}>;

export type FetchConfig = $Shape<{|
	+method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
	+headers: HeadersInit,
	+body: string,
	...QueryParams,
|}>;

type AuthResponse = {|
	+data: {|
		+token: string,
		+userId: string,
	|},
|};

type AuthManagementResponse = {|
	+meta: {
		+message: string,
	},
|};

type JSONAPISuccessResponse = JSONAPIDataDocument | JSONAPIMetaDocument;

/**
 * General fetch function that’s used by all API calls.
 * It adds configures headers, handles/formats error reponses
 */
const api = (
	endpoint: string,
	{ method, headers, body, ...query }: FetchConfig = {},
) => async (dispatch: Dispatch, getState: GetState) => {
	const token = selectors.auth.getToken(getState());

	try {
		const uri = buildQuery(API_ROOT + endpoint, query, {
			stringifyOpt: {
				encode: false,
			},
		});

		const response = await fetch(uri, {
			method,
			body,
			headers: addHeaders(token, headers),
		});

		if (!response.ok) {
			const contentType = response.headers.get('Content-type');
			if (
				contentType === null ||
				!(
					contentType.match(/application\/vnd\.api\+json/u) ||
					contentType.match(/application\/json/u)
				)
			) {
				throw new Error('Unknown error');
			}

			const { errors } = (await response.json(): JSONAPIErrorDocument);
			if (response.status === 401) {
				if (endpoint === LOGIN_ENDPOINT) {
					throw formatErrors(errors);
				}
				await dispatch(authActions.reAuthorize());
				return dispatch(api(endpoint, { method, headers, body, ...query }));
			}
			if (response.status === 403) {
				dispatch(
					notify({
						message: 'Insufficient permissions.',
						type: 'warning',
					}),
				);
			}

			throw formatErrors(errors);
		}

		// No content
		if (response.status === 204) {
			return null;
		}
		return (await response.json(): JSONAPISuccessResponse);
	} catch (error) {
		if (error instanceof TypeError) {
			// That means it’s a network error
			dispatch(
				notify({
					message:
						'Network unavailable. Please check your connection and try again.',
					type: 'warning',
				}),
			);
			throw new Error(
				'Network unavailable. Please check your connection and try again.',
			);
		}

		[].concat(error).forEach(err => {
			// eslint-disable-next-line no-console
			console.error(err);
		});

		throw [].concat(error);
	}
};

export const upload = (uploadObject: Blob, name: string) => async (
	dispatch: Dispatch,
	getState: GetState,
) => {
	const token = selectors.auth.getToken(getState());

	dispatch(
		notify({
			message: 'Upload in progress, please wait...',
			type: 'success',
		}),
	);

	// Upload the image using the fetch and FormData APIs
	const formData = new FormData();
	formData.append('uri', uploadObject, name);

	const response = await fetch(`${API_ROOT}/uploads`, {
		method: 'POST',
		headers: {
			...(token != null ? { Authorization: `Bearer ${token}` } : null),
		},
		body: formData,
	});

	if (response.ok === false) {
		dispatch(
			notify({
				message: 'Image could not be uploaded. Please try again.',
				type: 'error',
			}),
		);
		return false;
	}

	const result = await response.json();

	dispatch(
		notify({
			message: 'Image has been uploaded successfully',
			type: 'success',
		}),
	);
	return result;
};

export const login = (email: string, password: string) => async (
	dispatch: Dispatch,
) => {
	const {
		data: { token, ...rest },
	} = ((await dispatch(
		api(LOGIN_ENDPOINT, {
			method: 'POST',
			body: JSON.stringify({ email, password, strategy: 'local' }),
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		}),
	): $DownCast): AuthResponse);
	return ({
		data: {
			...rest,
			token: token.replace(/^Bearer /u, ''),
		},
	}: AuthResponse);
};

export const recoverPassword = (email: string) => async (
	dispatch: Dispatch,
) => {
	const { data } = ((await dispatch(
		api(AUTH_MANAGEMENT, {
			method: 'POST',
			body: JSON.stringify({ email }),
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			action: 'reset',
			option: 'generate',
		}),
	): $DownCast): { data: { message: string } });
	return ({
		meta: data,
	}: AuthManagementResponse);
};

export const updatePassword = (password: string, token: string) => async (
	dispatch: Dispatch,
) => {
	const { data } = ((await dispatch(
		api(AUTH_MANAGEMENT, {
			method: 'POST',
			body: JSON.stringify({ password, token }),
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			action: 'reset-confirm',
			option: 'generate',
		}),
	): $DownCast): { data: { message: string } });
	return ({
		meta: data,
	}: AuthManagementResponse);
};

export const getAll = (entity: EntityNames, config?: QueryParams) => () => (
	dispatch: Dispatch,
) =>
	((dispatch(
		api(`${entityUrls[entity]}`, config),
	): $DownCast): Promise<JSONAPIDataDocument>);

export const get = curry(
	(entity: EntityNames, id: string) => (dispatch: Dispatch) =>
		((dispatch(
			api(`${entityUrls[entity]}/${id}`),
		): $DownCast): Promise<JSONAPIDataDocument>),
);

export const create = curry(
	(entity: EntityNames, payload: JSONAPIDataDocument) => (
		dispatch: Dispatch,
	) =>
		((dispatch(
			api(`${entityUrls[entity]}`, {
				method: 'POST',
				body: JSON.stringify(payload),
			}),
		): $DownCast): Promise<JSONAPIDataDocument>),
);

export const update = curry(
	(entity: EntityNames, id: string, payload: JSONAPIDataDocument) => (
		dispatch: Dispatch,
	) =>
		((dispatch(
			api(`${entityUrls[entity]}/${id}`, {
				method: 'PATCH',
				body: JSON.stringify(payload),
			}),
		): $DownCast): Promise<JSONAPIDataDocument>),
);

export const remove = curry(
	(entity: EntityNames, id: string) => (dispatch: Dispatch) =>
		dispatch(
			api(`${entityUrls[entity]}/${id}`, {
				method: 'DELETE',
			}),
		),
);
