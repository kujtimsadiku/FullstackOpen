module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
		"node": true,
		"jest": true,
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
		"airbnb",
		"airbnb/hooks",
    ],
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
	'ignorePatterns': [
		'build', '.eslintrc.js'
	],
	'rules': {
	// 	'tab': [
	// 		'error',
	// 		1,
	// 	],
	// 	'space': [
	// 		'error',
	// 		1,
	// 	],
	// 	'linebreak-style': [
	// 		'error',
	// 		'unix'
	// 	],
	// 	'quotes': [
	// 		'error',
	// 		'single'
	// 	],
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

