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
		'./.eslint/browser.js',
		'./.eslint/jsx.js',
		'./.eslint/react.js',
		'./.eslint/eslint.js',
		'prettier',
		'prettier/react',
		'prettier/flowtype',
	],
	overrides: [
		{
			files: [
				'src/setupTests.js',
				'src/test-utils/**/*.js',
				'*.test.js',
				'*.spec.js',
				'**/__mocks__/*.js',
				'**/__tests__/*.js',
			],
			plugins: ['jest'],
			env: {
				jest: true,
			},
			extends: ['plugin:jest/recommended', 'plugin:jest/style'],
			rules: {
				'no-empty-function': 'off',
				'import/no-extraneous-dependencies': [
					'error',
					{ optionalDependencies: false },
				],
				'flowtype/no-types-missing-file-annotation': 'off',
				'flowtype/require-valid-file-annotation': 'off',
				'flowtype/require-parameter-type': 'off',
				'flowtype/require-return-type': 'off',
			},
		},
		{
			files: ['src/stories/**/*.stories.js'],
			rules: {
				'import/no-extraneous-dependencies': [
					'error',
					{ optionalDependencies: false },
				],
				'flowtype/no-types-missing-file-annotation': 'off',
				'flowtype/require-valid-file-annotation': 'off',
				'flowtype/require-parameter-type': 'off',
				'flowtype/require-return-type': 'off',
			},
		},
	],
};
