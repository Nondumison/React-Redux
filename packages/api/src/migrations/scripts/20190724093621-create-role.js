// @flow strict

module.exports = {
	// $FlowFixMe https://github.com/sequelize/sequelize/issues/11224
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable(
			{
				// schema: ?
				tableName: 'role',
			},
			{
				id: {
					allowNull: false,
					primaryKey: true,
					type: Sequelize.UUID,
					defaultValue: Sequelize.UUIDV4,
				},
				name: {
					type: Sequelize.STRING,
					allowNull: false,
				},
				createdAt: {
					type: Sequelize.DATE,
					allowNull: false,
					defaultValue: Sequelize.NOW,
				},
				updatedAt: {
					type: Sequelize.DATE,
					allowNull: false,
					defaultValue: Sequelize.NOW,
				},
			},
		);
	},
	// $FlowFixMe https://github.com/sequelize/sequelize/issues/11224
	down: queryInterface => {
		return queryInterface.dropTable('role', {});
	},
};
