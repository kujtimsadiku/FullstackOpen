module.exports = {
	'env': {
		'commonjs': true,
		'es2021': true,
		'node': true,
	},
	'extends': [
		'eslint:recommended',
		'plugin:react/recommended'
	],
	'overrides': [
	],
	'parserOptions': {
		'ecmaVersion': 'latest'
	},
	'plugins': [
		'react'
	],
	'ignorePatterns': [
		'build', '.eslintrc.js'
	],
	'rules': {
		'indent': [
			'error',
			4,
		],
		'linebreak-style': [
			'error',
			'unix'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'always'
		], 
		'eqeqeq': 'error', 
		'no-trailing-spaces': 'error', 
		'object-curly-spacing': [
			'error', 'always',
		], 
		'arrow-spacing': [
			'error', { 'before': true, 'after': true }
		],
		'no-console': 0,
	},
};
