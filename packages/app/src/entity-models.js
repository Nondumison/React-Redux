// @flow strict

/* eslint-disable import/prefer-default-export */

export type EntityModels = {|
	+user: {|
		+firstName: string,
		+lastName: string,
		+email: string,
	|},
	+role: {|
		+name: string,
	|},
	+foo: {|
		+userName: string,
		+favColor: string,
	|},
	+bar: {|
		+name: string,
		+location: string,
	|},
|};

export type EntityNames = $Keys<EntityModels>;

export const entityUrls: { +[entity: EntityNames]: string } = {
	user: '/users',
	role: '/roles',
	foo: '/foos',
	bar: '/bars',
};
