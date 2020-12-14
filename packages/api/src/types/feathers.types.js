// @flow strict

/* eslint-disable no-use-before-define, flowtype/no-existential-type, flowtype/require-exact-type */

import { type UserType } from './entity.types';

export type Entities =
	| 'users'
	| 'authentication'
	| 'roles'
	| 'mailer'
	| 'authmanagement'
	| 'uploads'
	| 'foos'
	| 'bars';

export type Paths =
	| '/users'
	| '/authentication'
	| '/roles'
	| '/mailer'
	| '/authmanagement'
	| '/uploads'
	| '/foos'
	| '/bars';

export type Methods =
	| 'find'
	| 'get'
	| 'create'
	| 'update'
	| 'patch'
	| 'remove';

export type HookTypes = 'before' | 'after' | 'error';

export type Provider = 'rest' | 'socketio' | 'primus' | void;

export type FeathersPayload = { [string]: * };

export type HTTPCodes =
	| 100
	| 101
	| 200
	| 201
	| 202
	| 203
	| 204
	| 205
	| 206
	| 300
	| 301
	| 302
	| 303
	| 304
	| 305
	| 306
	| 307
	| 400
	| 401
	| 404
	| 405
	| 406
	| 407
	| 408
	| 409
	| 410
	| 411
	| 412
	| 414
	| 415
	| 416
	| 417
	| 500
	| 501
	| 502
	| 503
	| 504
	| 505;

export type FeathersQuery = $Shape<{|
	$limit: number,
	$skip: number,
	+[field: string]: string,
	+$sort: { +[field: string]: 1 | -1 },
	+$select: Array<string>,
	+$in: Array<*>,
	+$nin: Array<*>,
	+$lt: number | Date,
	+$lte: number | Date,
	+$gt: number | Date,
	+$gte: number | Date,
	+$ne: Array<*>,
	+$or: Array<*>,
|}>;

type FeathersError = {
	name?: string,
	type?: string,
	code?: string,
	status?: string,
	detail?: string,
	title?: string,
	message?: string,
	stack?: *,
	meta?: {
		type?: string,
	},
	errors?: $ReadOnlyArray<FeathersError>,
};

export type Context = {|
	+app: App,
	+service: Service,
	+path: Entities,
	+method: Methods,
	+type: HookTypes,
	params: Params,
	id: string,
	data: FeathersPayload,
	error: FeathersError,
	result: *,
	dispatch: *,
	statusCode: HTTPCodes,
	+toJSON: *,
|};

export type Params = {
	+query?: FeathersQuery,
	+provider?: Provider,
	+user?: UserType,
	+connection?: *,
	+headers?: { [name: string]: string },
	[string]: *,
};

export type Hook = (context: Context) => mixed;

export type Hooks = {|
	+before?: {|
		+all?: Array<Hook>,
		+find?: Array<Hook>,
		+get?: Array<Hook>,
		+create?: Array<Hook>,
		+update?: Array<Hook>,
		+patch?: Array<Hook>,
		+remove?: Array<Hook>,
	|},
	+after?: {|
		+all?: Array<Hook>,
		+find?: Array<Hook>,
		+get?: Array<Hook>,
		+create?: Array<Hook>,
		+update?: Array<Hook>,
		+patch?: Array<Hook>,
		+remove?: Array<Hook>,
	|},
	+error?: {|
		+all?: Array<Hook>,
		+find?: Array<Hook>,
		+get?: Array<Hook>,
		+create?: Array<Hook>,
		+update?: Array<Hook>,
		+patch?: Array<Hook>,
		+remove?: Array<Hook>,
	|},
|};

export type FeathersPaginateReturnType<Entity> = {|
	total: number,
	limit: number,
	skip: number,
	data: $ReadOnlyArray<Entity>,
|};

export type FeathersReturnType<Entity> =
	| FeathersPaginateReturnType<Entity>
	| Array<Entity>;

export type Service = {|
	+find: (params?: Params) => Promise<FeathersPaginateReturnType<*>>,
	+get: (id: string, params?: Params) => Promise<*>,
	+create: (data: $Shape<*>, params?: Params) => Promise<*>,
	+update: (id: string, data: $Shape<*>, params?: Params) => Promise<*>,
	+patch: (id: string, data: $Shape<*>, params?: Params) => Promise<*>,
	+remove: (id: string, params?: Params) => Promise<*>,
	+setup: (app: App, patch: Entities) => Promise<*> | *,
	+hooks: Hooks => void,
|};

export type Channel = {|
	+join: (*) => Channel,
	+leave: (*) => Channel,
	+filter: (*) => Channel,
	+send: (*) => Channel,
	+connections: [*],
	+length: number,
|};

export type NodeRequest = (req: *, res: *, next: *) => mixed;

export type App = {|
	+use: (...args: Array<mixed>) => void,
	+service: (service: Entities) => Service,
	+hooks: Hooks => App,
	+publish: <Entity>(
		param?:
			| string
			| $ReadOnlyArray<string>
			| ((data: { [string]: * }, context: Context) => Channel),
	) => Service,
	+configure: ((*) => *) => void,
	+listen: number => (param: {| on: * |}) => void,
	setup: (server?: string) => App,
	+set: (string, value: mixed) => void,
	+get: string => *,
	+on: (eventName: string, *) => void,
	+emit: (eventName: string, *) => void,
	+removeListener: (eventName: string, *) => void,
	+mixins: *,
	+services: { [Entities]: Service },
	+defaultService: (patch: Entities) => mixed,
	+channel: (
		T1: string,
		T2?: string,
		T3?: string,
		T4?: string,
		T5?: string,
		T6?: string,
	) => Channel,
	+channels: [string],
|};
