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
        "camelcase": [1, "always"],
        "eqeqeq": [1, "always"],
        "no-alert": [1, "always"],
        "no-empty-functions": [1, "always"],
        "no-eval": [2, "always"],
        "semi": [1, "always"],
        "no-var": [1, "always"]
    }
};