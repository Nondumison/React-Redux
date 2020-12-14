// @flow strict

const uuid = require('uuid/v4');
const hasher = require('@feathersjs/authentication-local/lib/utils/hash');

const app = require('../../app').default;

module.exports = {
	// $FlowFixMe https://github.com/sequelize/sequelize/issues/11224
	up: async queryInterface => {
		const [[{ id: adminId }]] = await app
			.get('sequelizeClient')
			.query("SELECT id FROM role WHERE name = 'super'");

		const [[{ id: userId }]] = await app
			.get('sequelizeClient')
			.query("SELECT id FROM role WHERE name = 'user'");

		const password = process.env.DEFAULT_ADMIN_PW;

		if (password == null) {
			throw new Error(
				// $FlowIgnore Should not coerce string from falsy value
				`Please set Password in .env.${process.env.NODE_ENV}.local. See Readme for details`,
			);
		}
		return queryInterface.bulkInsert(
			'user',
			[
				{
					id: uuid(),
					firstName: 'Admin',
					lastName: 'Example',
					email: 'admin@example.com',
					password: await hasher(password),
					roleId: adminId,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					id: uuid(),
					firstName: 'eldo',
					lastName: 'energy',
					email: 'eldo@energy.com',
					password: await hasher(password),
					roleId: userId,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{},
		);
	},

	// $FlowFixMe https://github.com/sequelize/sequelize/issues/11224
	down: queryInterface => {
		return queryInterface.bulkDelete('user', null, {});
	},
};
