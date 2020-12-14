module.exports = {
	plugins: ['node'],
	env: {
		node: true,
	},
	rules: {
		/*
		 * Errors
		 */
		'no-buffer-constructor': 'error',
		'node/no-unsupported-features/es-builtins': 'error',
		'node/no-unsupported-features/node-builtins': 'error',
		'node/process-exit-as-throw': 'error',
		'node/shebang': 'error',

		/*
		 * Best practices
		 */
		'node/no-deprecated-api': 'warn',

		/*
		 * Style
		 */
		'node/prefer-global/buffer': 'warn',
		'node/prefer-global/console': 'warn',
		'node/prefer-global/process': 'warn',
		'node/prefer-global/url': 'warn',
		'node/prefer-global/url-search-params': 'warn',
	},
};
