// @flow strict

export type UserType = {|
	+id: string,
	+firstName: string,
	+lastName: string,
	+email: string,
	+password: string,
	+resetToken: string,
|};

export type RoleType = {|
	+id: string,
	+name: string,
|};

export type FooType = {|
	+id: string,
	+userName: string,
	+favColor: string,
|};

export type BarType = {|
	+id: string,
	+name: string,
	+location: string,
|};
