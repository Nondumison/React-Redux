// @flow strict

const uuid = require('uuid/v4');

module.exports = {
	// $FlowFixMe https://github.com/sequelize/sequelize/issues/11224
	up: queryInterface => {
		return queryInterface.bulkInsert(
			'role',
			[
				{
					id: uuid(),
					name: 'super',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					id: uuid(),
					name: 'user',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					id: uuid(),
					name: 'user-unverified',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					id: uuid(),
					name: 'anonymous',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{},
		);
	},

	// $FlowFixMe https://github.com/sequelize/sequelize/issues/11224
	down: queryInterface => {
		return queryInterface.bulkDelete('role', null, {});
	},
};
