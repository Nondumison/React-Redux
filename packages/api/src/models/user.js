// @flow strict

import Sequelize from 'sequelize';

import type { App } from 'types/feathers.types';

export default (app: App) => {
	const sequelizeClient: Sequelize = app.get('sequelizeClient');
	const user = sequelizeClient.define('user', {
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
		createdAt: {
			type: Sequelize.DATE,
			defaultValue: Sequelize.NOW,
		},
		resetToken: {
			type: Sequelize.STRING,
			allowNull: true,
		},
	});

	user.associate = models => {
		user.belongsTo(models.role);
	};

	return user;
};
