module.exports = {
	plugins: ['flowtype', 'unicorn'],
	rules: {
		/*
		 * Errors
		 */
		'flowtype/define-flow-type': 'warn',
		'flowtype/no-dupe-keys': 'error',
		'flowtype/use-flow-type': 'warn',

		/*
		 * Best practices
		 */
		'flowtype/no-existential-type': 'warn',
		'flowtype/no-flow-fix-me-comments': ['warn', '.+'],
		'flowtype/no-primitive-constructor-types': 'warn',
		'no-unused-expressions': 'off',
		'babel/no-unused-expressions': 'off',
		'flowtype/no-unused-expressions': 'warn',
		'flowtype/no-types-missing-file-annotation': 'warn',
		'flowtype/require-exact-type': 'warn',
		'flowtype/require-valid-file-annotation': [
			'warn',
			'always',
			{
				annotationStyle: 'line',
			},
		],
		// Safe because we’re using strict static typing
		'unicorn/no-fn-reference-in-iterator': 'off',

		/*
		 * Style
		 */
		'flowtype/array-style-complex-type': 'warn',
		'flowtype/array-style-simple-type': 'warn',
		'flowtype/boolean-style': 'warn',
		'flowtype/newline-after-flow-annotation': 'warn',
	},
};
