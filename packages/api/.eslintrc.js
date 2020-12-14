module.exports = {
	parser: 'babel-eslint',
	parserOptions: {
		ecmaVersion: 2019,
	},
	env: {
		es6: true,
	},
	settings: {
		polyfills: [
			'Promise',
			'fetch',
			'Object.entries',
			'Object.values',
			'Set',
			'Map',
		],
	},
	globals: {
		process: 'readonly',
		module: 'readonly',
	},
	extends: [
		'./.eslint/javascript.js',
		'./.eslint/flow.js',
		'./.eslint/ramda.js',
		'./.eslint/module.js',
		'./.eslint/node.js',
		'./.eslint/eslint.js',
		'prettier',
		'prettier/flowtype',
	],
	rules: {
		'no-param-reassign': [
			2,
			{
				props: true,
				ignorePropertyModificationsFor: [
					'app',
					'context',
					'req',
					'res',
					'acc',
				],
			},
		],
	},
	overrides: [
		{
			files: ['flow-typed/**/*'],
			rules: {
				'no-use-before-define': 'off',
				'no-unused-vars': 'off',
				'spaced-comment': 'off',
				'flowtype/no-types-missing-file-annotation': 'off',
				'flowtype/require-valid-file-annotation': 'off',
				'import/no-duplicates': 'off',
				'import/no-unresolved': 'off',
				'import/newline-after-import': 'off',
				'import/extensions': 'off',
			},
		},
		{
			files: [
				'src/setupTests.js',
				'*.test.js',
				'*.spec.js',
				'**/__mocks__/*.js',
				'**/__tests__/*.js',
			],
			env: {
				jest: true,
			},
			rules: {
				'import/no-extraneous-dependencies': [
					'error',
					{ optionalDependencies: false },
				],
				'func-names': 'off',
				'flowtype/no-types-missing-file-annotation': 'off',
				'flowtype/require-valid-file-annotation': 'off',
				'flowtype/require-parameter-type': 'off',
				'flowtype/require-return-type': 'off',
			},
		},
		{
			files: ['src/migrations/**/*.js'],
			rules: {
				strict: 'warn',
				'import/unambiguous': 'off',
				'import/no-commonjs': 'off',
				'module-resolver/use-alias': 'off',
			},
		},
	],
};
