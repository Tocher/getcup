module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true,
    },
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    plugins: [
        'react',
        '@typescript-eslint',
    ],
    rules: {
        'object-curly-spacing': ['error', 'never'],
        'prefer-arrow-callback': ['error', {'allowNamedFunctions': true}],
        'quotes': ['error', 'single'],
        'no-multi-spaces': 'error',
        'no-multiple-empty-lines': ['error', {'max': 1, 'maxEOF': 1}],
        'no-mixed-spaces-and-tabs': 'error',
        'indent': ['error', 4],
    }
};
