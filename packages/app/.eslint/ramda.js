module.exports = {
	plugins: ['ramda'],
	rules: {
		/*
		 * Best practices
		 */
		'ramda/always-simplification': 'warn',
		'ramda/any-pass-simplification': 'warn',
		'ramda/both-simplification': 'warn',
		'ramda/complement-simplification': 'warn',
		'ramda/compose-pipe-style': 'warn',
		'ramda/compose-simplification': 'warn',
		'ramda/cond-simplification': 'warn',
		'ramda/either-simplification': 'warn',
		'ramda/eq-by-simplification': 'warn',
		'ramda/filter-simplification': 'warn',
		'ramda/if-else-simplification': 'warn',
		'ramda/map-simplification': 'warn',
		'ramda/merge-simplification': 'warn',
		'ramda/no-redundant-and': 'warn',
		'ramda/no-redundant-not': 'warn',
		'ramda/no-redundant-or': 'warn',
		'ramda/pipe-simplification': 'warn',
		'ramda/prefer-both-either': 'warn',
		'ramda/prefer-complement': 'warn',
		'ramda/prefer-ramda-boolean': 'warn',
		'ramda/prop-satisfies-simplification': 'warn',
		'ramda/reduce-simplification': 'warn',
		'ramda/reject-simplification': 'warn',
		'ramda/set-simplification': 'warn',
		'ramda/unless-simplification': 'warn',
		'ramda/when-simplification': 'warn',
	},
};
