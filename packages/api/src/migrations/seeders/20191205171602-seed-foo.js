// @flow strict

const uuid = require('uuid/v4');

module.exports = {
	// $FlowFixMe https://github.com/sequelize/sequelize/issues/11224
	up: queryInterface => {
		return queryInterface.bulkInsert(
			'foo',
			[
				{
					id: uuid(),
					userName: 'Batman',
					favColor: 'black',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					id: uuid(),
					userName: 'Superman',
					favColor: 'blue',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					id: uuid(),
					userName: 'Spider-Man',
					favColor: 'red',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					id: uuid(),
					userName: 'Ironman',
					favColor: 'yellow',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{},
		);
	},

	// $FlowFixMe https://github.com/sequelize/sequelize/issues/11224
	down: queryInterface => {
		return queryInterface.bulkDelete('foo', null, {});
	},
};
