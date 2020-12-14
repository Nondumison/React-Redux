module.exports = {
	settings: {
		react: {
			version: 'detect',
			flowVersion: 'detect',
		},
	},
	plugins: ['react'],
	rules: {
		/*
		 * Errors
		 */
		'react/no-access-state-in-setstate': 'error',
		'react/no-danger': 'error',
		'react/no-danger-with-children': 'error',
		'react/no-did-mount-set-state': ['error', 'disallow-in-func'],
		'react/no-did-update-set-state': ['error', 'disallow-in-func'],
		'react/no-direct-mutation-state': 'error',
		'react/no-this-in-sfc': 'error',
		'react/no-typos': 'error',
		'react/no-unescaped-entities': 'error',
		'react/no-unknown-property': 'error',
		'react/no-will-update-set-state': ['error', 'disallow-in-func'],
		'react/react-in-jsx-scope': 'error',
		'react/require-render-return': 'error',
		'react/style-prop-object': 'error',
		'react/void-dom-elements-no-children': 'error',

		/*
		 * Best practices
		 */
		'react/button-has-type': 'warn',
		'react/display-name': 'warn',
		'react/no-array-index-key': 'warn',
		'react/no-children-prop': 'warn',
		'react/no-deprecated': 'warn',
		'react/no-find-dom-node': 'warn',
		'react/no-is-mounted': 'warn',
		'react/no-redundant-should-component-update': 'warn',
		'react/no-render-return-value': 'warn',
		'react/no-string-refs': 'warn',
		'react/no-unsafe': 'warn',
		'react/no-unused-state': 'warn',
		'react/prefer-stateless-function': 'warn',
		'react/require-optimization': 'warn',
		'react/self-closing-comp': 'warn',

		/*
		 * Style
		 */
		'react/destructuring-assignment': 'warn',
		'react/no-multi-comp': [
			'warn',
			{
				ignoreStateless: true,
			},
		],
		'react/prefer-es6-class': 'warn',
		'react/sort-comp': 'warn',
	},
};
