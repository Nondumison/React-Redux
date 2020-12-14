// @flow

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable(
			{
				// schema ?
				tableName: 'foo',
			},
			{
				id: {
					allowNull: false,
					primaryKey: true,
					type: Sequelize.UUID,
					defaultValue: Sequelize.UUIDV4,
				},
				userName: {
					type: Sequelize.STRING,
					allowNull: false,
				},
				favColor: {
					type: Sequelize.STRING,
					allowNull: false,
				},
				createdAt: {
					allowNull: false,
					type: Sequelize.DATE,
					defaultValue: Sequelize.NOW,
				},
				updatedAt: {
					allowNull: false,
					type: Sequelize.DATE,
					defaultValue: Sequelize.NOW,
				},
			},
		);
	},

	down: queryInterface => {
		return queryInterface.dropTable('foo', {});
	},
};
