/* eslint-env node */
module.exports = {
    root: true,
    env: {
        node: true,
        browser: true,
        es2021: true
    },
    extends: [
        'plugin:vue/vue3-recommended',
        '@vue/eslint-config-typescript',
        'plugin:prettier/recommended'
    ],
    parserOptions: {
        ecmaVersion: 'latest'
    },
    rules: {
        'vue/multi-word-component-names': 'off',
        'prettier/prettier': 'error'
    }
}
