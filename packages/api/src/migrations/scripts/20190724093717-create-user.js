// @flow strict

module.exports = {
	// $FlowFixMe https://github.com/sequelize/sequelize/issues/11224
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable(
			{
				// schema ?
				tableName: 'user',
			},
			{
				id: {
					allowNull: false,
					primaryKey: true,
					type: Sequelize.UUID,
					defaultValue: Sequelize.UUIDV4,
				},
				firstName: {
					type: Sequelize.STRING,
					allowNull: false,
				},
				lastName: {
					type: Sequelize.STRING,
					allowNull: false,
				},
				email: {
					type: Sequelize.STRING,
					allowNull: false,
					unique: true,
					validate: {
						isEmail: true,
					},
				},
				password: {
					type: Sequelize.STRING,
					allowNull: false,
				},
				resetToken: Sequelize.STRING,
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
				roleId: {
					type: Sequelize.UUID,
					references: {
						model: 'role',
						id: 'id',
					},
					onUpdate: 'cascade',
					onDelete: 'set null',
				},
			},
		);
	},

	// $FlowFixMe https://github.com/sequelize/sequelize/issues/11224
	down: queryInterface => {
		return queryInterface.dropTable('user', {});
	},
};
