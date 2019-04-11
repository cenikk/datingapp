module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
        "camelcase": [1],
        "eqeqeq": [1, "always"],
        "comma-style": [2, "last"],
        "comma-spacing": [2, { "before": false, "after": true }],
        "indent": [2, 4],
        "no-alert": [1],
        "no-console": [0],
        "no-empty-functions": [0],
        "no-eval": [2],
        "semi": [1, "always"],
        "no-var": [1],
        "no-unused-vars": [2, { "vars": "all", "args": "after-used", "ignoreRestSiblings": false }],
        "quotes": [1, "single"],
    }
};