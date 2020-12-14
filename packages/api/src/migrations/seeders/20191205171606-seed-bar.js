// @flow strict

const uuid = require('uuid/v4');

const app = require('../../app').default;

module.exports = {
	// $FlowFixMe https://github.com/sequelize/sequelize/issues/11224
	up: async queryInterface => {
		const fooIds = (
			await app.get('sequelizeClient').query('SELECT id FROM foo')
		)[0].map(({ id }) => id);

		return queryInterface.bulkInsert(
			'bar',
			[
				{
					id: uuid(),
					name: 'Joker',
					location: 'Arkham Asylum',
					createdAt: new Date(),
					updatedAt: new Date(),
					fooId: fooIds[0],
				},
				{
					id: uuid(),
					name: 'Catwoman',
					location: 'Gotham',
					createdAt: new Date(),
					updatedAt: new Date(),
					fooId: fooIds[0],
				},
				{
					id: uuid(),
					name: 'Lex Luthor',
					location: 'Metropolis',
					createdAt: new Date(),
					updatedAt: new Date(),
					fooId: fooIds[1],
				},
				{
					id: uuid(),
					name: 'Dr. Evil',
					location: 'The Moon',
					createdAt: new Date(),
					updatedAt: new Date(),
					fooId: null,
				},
			],
			{},
		);
	},

	// $FlowFixMe https://github.com/sequelize/sequelize/issues/11224
	down: queryInterface => {
		return queryInterface.bulkDelete('bar', null, {});
	},
};
