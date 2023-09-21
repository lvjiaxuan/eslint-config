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

  ignorePatterns: [
    '**/*.min.*',
    '**/CHANGELOG.md',
    '**/dist',
    '**/LICENSE*',
    '**/output',
    '**/out',
    '**/coverage',
    '**/public',
    '**/temp',
    '**/package-lock.json',
    '**/pnpm-lock.yaml',
    '**/yarn.lock',
    '**/__snapshots__',
    // ignore for in lint-staged
    '**/*.css',
    '**/*.png',
    '**/*.ico',
    '**/*.toml',
    '**/*.patch',
    '**/*.txt',
    '**/*.crt',
    '**/*.key',
    '**/Dockerfile',
    // force include
    '!**/.github',
    '!**/.vitepress',
    '!**/.vscode',
    // force exclude
    '**/.vitepress/cache',
  ],

  // Install plugins as well.
  extends: [
    'eslint:recommended',
    'plugin:promise/recommended',
    'plugin:eslint-comments/recommended',
    'plugin:jsonc/recommended-with-jsonc',
    'plugin:yml/standard',
    'plugin:markdown/recommended',
  ],
}
