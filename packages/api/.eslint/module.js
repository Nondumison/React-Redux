module.exports = {
	parserOptions: {
		sourceType: 'module',
	},
	plugins: ['import', 'module-resolver'],
	settings: {
		'import/resolver': {
			'babel-module': {},
		},
	},
	rules: {
		strict: 'warn',
		'import/no-commonjs': 'error',
		'import/no-amd': 'error',
		'module-resolver/use-alias': 'error',
	},
};
