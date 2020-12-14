// @flow strict

import Sequelize from 'sequelize';

import type { App } from 'types/feathers.types';

export default (app: App) => {
	const sequelizeClient: Sequelize = app.get('sequelizeClient');
	const foo = sequelizeClient.define('foo', {
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
	});

	foo.associate = models => {
		foo.hasMany(models.bar);
	};

	return foo;
};
