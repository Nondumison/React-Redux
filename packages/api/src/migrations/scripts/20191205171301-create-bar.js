// @flow

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable(
			{
				// schema ?
				tableName: 'bar',
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
				location: {
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
				fooId: {
					type: Sequelize.UUID,
					references: {
						model: 'foo',
						id: 'id',
					},
					onUpdate: 'cascade',
					onDelete: 'set null',
				},
			},
		);
	},

	down: queryInterface => {
		return queryInterface.dropTable('bar', {});
	},
};
