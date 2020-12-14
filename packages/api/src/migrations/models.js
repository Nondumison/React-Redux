// @flow strict

const Sequelize = require('sequelize');

const app = require('../app').default;

const sequelize = app.get('sequelizeClient');
const { models } = sequelize;

// The export object must be a dictionary of model names -> models
// It must also include sequelize (instance) and Sequelize (constructor) properties
// eslint-disable-next-line prefer-object-spread
module.exports = Object.assign(
	{
		Sequelize,
		sequelize,
	},
	models,
);
