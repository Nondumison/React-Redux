import newId from 'test-utils/newId';

export const login = jest.fn(() => () =>
	Promise.resolve({
		data: {
			token:
				'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
			roles: [],
		},
	}),
);
export const updatePassword = jest.fn(() => () =>
	Promise.resolve({ meta: { message: 'foo' } }),
);
export const recoverPassword = jest.fn(() => () =>
	Promise.resolve({ meta: { message: 'foo' } }),
);
export const setPassword = jest.fn(() => () =>
	Promise.resolve({ meta: { message: 'foo' } }),
);
export const getAll = jest.fn(() => () => () =>
	Promise.resolve({
		data: [
			{
				type: 'user',
				id: '1',
				attributes: {
					firstName: 'Emir',
					lastName: 'Gluhbegovic',
					email: 'emir@eldoenergy.com',
				},
				links: { self: '/users/1' },
			},
			{
				type: 'user',
				id: '2',
				attributes: {
					firstName: 'Admin',
					lastName: 'Marley',
					email: 'admin@marley.com',
				},
				links: { self: '/users/2' },
			},
			{
				type: 'roles',
				id: '1',
				attributes: {
					name: 'anonymous',
				},
				relationships: { permissions: { data: null } },
				links: { self: '/roles/1' },
			},
			{
				type: 'roles',
				id: '2',
				attributes: {
					name: 'self-verify',
				},
				relationships: { permissions: { data: null } },
				links: { self: '/roles/2' },
			},
			{
				type: 'roles',
				id: '3',
				attributes: {
					name: 'organisation-sales',
				},
				relationships: { permissions: { data: null } },
				links: { self: '/roles/3' },
			},
			{
				type: 'roles',
				id: '4',
				attributes: {
					name: 'organisation-admin',
				},
				relationships: { permissions: { data: null } },
				links: { self: '/roles/4' },
			},
			{
				type: 'roles',
				id: '5',
				attributes: {
					name: 'super',
				},
				relationships: { permissions: { data: null } },
				links: { self: '/roles/5' },
			},
		],
	}),
);
export const get = jest.fn(type => id => () =>
	Promise.resolve({
		data: {
			type,
			id,
			attributes: {
				foo: 'foo',
				bar: 'bar',
			},
		},
	}),
);
export const create = jest.fn(type => ({ data }) => () =>
	Promise.resolve({
		data: {
			...data,
			id: newId,
			type: type === data.type && type,
		},
	}),
);
export const update = jest.fn(type => (id, { data }) => () =>
	Promise.resolve({
		data: {
			...data,
			id,
			type: type === data.type && type,
		},
	}),
);
export const remove = jest.fn(() => () => () => Promise.resolve());
export const upload = jest.fn((_, filename) => () =>
	Promise.resolve(filename !== 'test-fail' || undefined),
);
