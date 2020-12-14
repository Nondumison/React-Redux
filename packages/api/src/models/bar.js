// @flow strict

import Sequelize from 'sequelize';

import type { App } from 'types/feathers.types';

export default (app: App) => {
	const sequelizeClient: Sequelize = app.get('sequelizeClient');
	const bar = sequelizeClient.define('bar', {
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
	});

	bar.associate = models => {
		bar.belongsTo(models.foo);
	};

	return bar;
};
