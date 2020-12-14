module.exports = {
	env: {
		browser: true,
	},
	plugins: ['compat', 'import'],
	rules: {
		/*
		 * Errors
		 */
		'import/no-nodejs-modules': 'error',
		// https://github.com/amilajack/eslint-plugin-compat/wiki/Adding-polyfills
		'compat/compat': 'warn',
	},
};
