// @flow strict

require = require('esm')(module); // eslint-disable-line no-global-assign
require('@babel/register'); // eslint-disable-line import/no-unassigned-import

const app = require('../app').default;

const env = process.env.NODE_ENV || 'development'; // flowlint-line sketchy-null: off
const dialect = 'postgres';

module.exports = {
	[env]: {
		dialect,
		url: app.get(dialect),
		migrationStorageTableName: '_migrations',
		seederStorage: 'sequelize',
		seederStorageTableName: '_seeds',
	},
};
