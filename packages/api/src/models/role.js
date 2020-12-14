// @flow strict

import Sequelize from 'sequelize';

import type { App } from 'types/feathers.types';

export default (app: App) => {
	const sequelizeClient: Sequelize = app.get('sequelizeClient');
	const role = sequelizeClient.define('role', {
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
	});

	role.associate = models => {
		role.hasMany(models.user);
	};

	return role;
};
