const { edit, getPaths } = require('@rescripts/utilities');
const { both, prop, propSatisfies, includes, assocPath } = require('ramda');

const isESLintLoader = both(
	prop('loader'),
	propSatisfies(includes('eslint-loader'), 'loader'),
);

const enableEmitWarning = assocPath(['options', 'emitWarning'], true);

module.exports = [
	'env',
	{
		jest: config => {
			// react-scripts provides a transformer file in the jest config here
			// changing it to 'babel-jest' will look for a root .babelrc by default
			config.transform['^.+\\.(js|jsx|ts|tsx)$'] = 'babel-jest';
			return config;
		},
	},
	// Stop lint warnings from breaking the dev build
	config => edit(enableEmitWarning, getPaths(isESLintLoader, config), config),
];
