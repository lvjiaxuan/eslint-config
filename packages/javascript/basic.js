module.exports = {
  // #https://eslint.org/docs/developer-guide/nodejs-api#linterverify
  reportUnusedDisableDirectives: true,

  env: {
    'shared-node-browser': true,
    browser: true,
    node: true,
    es6: true,
    es2022: true,
  },

  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      tsx: true,
    },
  },

  globals: {
    // document: 'readonly',
    // navigator: 'readonly',
    // window: 'readonly',
  },

  ignorePatterns: [
    '*.min.*',
    'CHANGELOG.md',
    'dist',
    'LICENSE*',
    'output',
    'coverage',
    'public',
    'temp',
    'packages-lock.json',
    'pnpm-lock.yaml',
    'yarn.lock',
    '__snapshots__',
    '!.github',
    '!.vitepress',
    '!.vscode',
  ],

  extends: [
    'eslint:recommended',
    'plugin:promise/recommended',
    'plugin:eslint-comments/recommended',
    'plugin:jsonc/recommended-with-jsonc',
    'plugin:yml/standard',
    'plugin:markdown/recommended',
  ],
}
