module.exports = {
  env: {
    'shared-node-browser': true,
    browser: true,
    node: true,
    es6: true,
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      tsx: true,
    },
  },
  rules: {
    // My base rules #https://eslint.org/docs/rules/
    'no-empty': ['error', { allowEmptyCatch: true }],
    'no-unused-vars': 'off', // tree shaking help
    'no-empty-function': 'warn',
    indent: ['warn', 2],
    'template-curly-spacing': ['warn', 'always'],
    'sort-imports': [
      'warn',
      {
        ignoreCase: false,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
        allowSeparatedGroups: false,
      },
    ],
  },
}
