module.exports = {
	extends: [
		'stylelint-config-recommended-scss',
		'stylelint-config-recess-order',
	],
	plugins: ['stylelint-order'],
	// ignoreFiles: [' resources/scss/lib/**/*.scss'],
	rules: {
		'string-quotes': 'single',
		'no-descending-specificity': null,
		'no-duplicate-selectors': null,
	},
};
