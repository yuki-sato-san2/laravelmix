module.exports = {
	root: true,
	env: {
		browser: true,
		node: true,
	},
	parser: 'babel-eslint',
	extends: ['eslint:recommended', 'plugin:react/recommended', 'prettier'],
	parserOptions: {
		ecmaVersion: 2019,
		sourceType: 'module',
	},
	plugins: ['prettier'],
	globals: {},
	rules: {
		'react/prop-types': 'off',
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
	},
};
