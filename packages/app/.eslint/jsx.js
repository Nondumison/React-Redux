module.exports = {
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
	},
	plugins: ['react', 'jsx-a11y'],
	rules: {
		/*
		 * Errors
		 */
		'react/jsx-no-duplicate-props': 'error',
		'react/jsx-no-target-blank': 'error',
		'react/jsx-no-undef': 'error',
		'react/jsx-uses-react': 'warn',
		'react/jsx-uses-vars': 'warn',

		/*
		 * Best practices
		 */
		'react/jsx-child-element-spacing': 'warn',
		'react/jsx-key': 'warn',
		'react/jsx-no-comment-textnodes': 'warn',
		'react/jsx-pascal-case': 'warn',

		/*
		 * Accessibility
		 */
		'jsx-a11y/accessible-emoji': 'warn',
		'jsx-a11y/alt-text': 'warn',
		'jsx-a11y/anchor-has-content': 'warn',
		'jsx-a11y/anchor-is-valid': 'warn',
		'jsx-a11y/aria-activedescendant-has-tabindex': 'warn',
		'jsx-a11y/aria-props': 'warn',
		'jsx-a11y/aria-proptypes': 'warn',
		'jsx-a11y/aria-role': 'warn',
		'jsx-a11y/aria-unsupported-elements': 'warn',
		'jsx-a11y/click-events-have-key-events': 'warn',
		'jsx-a11y/heading-has-content': 'warn',
		'jsx-a11y/html-has-lang': 'warn',
		'jsx-a11y/iframe-has-title': 'warn',
		'jsx-a11y/img-redundant-alt': 'warn',
		'jsx-a11y/interactive-supports-focus': [
			'warn',
			{
				tabbable: [
					'button',
					'checkbox',
					'link',
					'searchbox',
					'spinbutton',
					'switch',
					'textbox',
				],
			},
		],
		'jsx-a11y/label-has-for': 'warn',
		'jsx-a11y/label-has-associated-control': 'warn',
		'jsx-a11y/lang': 'warn',
		'jsx-a11y/media-has-caption': 'warn',
		'jsx-a11y/mouse-events-have-key-events': 'warn',
		'jsx-a11y/no-access-key': 'warn',
		'jsx-a11y/no-autofocus': 'warn',
		'jsx-a11y/no-distracting-elements': 'warn',
		'jsx-a11y/no-interactive-element-to-noninteractive-role': 'warn',
		'jsx-a11y/no-noninteractive-element-interactions': 'warn',
		'jsx-a11y/no-noninteractive-element-to-interactive-role': 'warn',
		'jsx-a11y/no-noninteractive-tabindex': 'warn',
		'jsx-a11y/no-onchange': 'warn',
		'jsx-a11y/no-redundant-roles': 'warn',
		'jsx-a11y/no-static-element-interactions': 'warn',
		'jsx-a11y/role-has-required-aria-props': 'warn',
		'jsx-a11y/role-supports-aria-props': 'warn',
		'jsx-a11y/scope': 'warn',
		'jsx-a11y/tabindex-no-positive': 'warn',

		/*
		 * Style
		 */
		'react/jsx-boolean-value': 'warn',
		'react/jsx-curly-brace-presence': ['warn', 'never'],
	},
};
