module.exports = {
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      globalReturn: false,
      impliedStrict: true,
      jsx: true
    }
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
  globals: {
    document: 'readonly',
    navigator: 'readonly',
    window: 'readonly',
  },
  rules: {
    // base.
    'no-empty': [ 'error', { allowEmptyCatch: true } ],
    'no-unused-vars': 'off',
    'no-empty-function': 'warn',
    'no-whitespace-before-property': 'warn',
    indent: [ 'warn', 2 ],
    'template-curly-spacing': [ 'warn', 'always' ],
    'sort-imports': [
      'error',
      {
        ignoreCase: false,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: [ 'none', 'all', 'multiple', 'single' ],
        allowSeparatedGroups: false,
      },
    ],
    // prettier related.
    'max-len': [ 'warn', { code: 120, tabWidth: 2 } ], // printWidth: 120 tabWidth: 2
    'no-tabs': [ 'warn', { allowIndentationTabs: false } ], // useTabs: false
    semi: [ 'warn', 'never' ], // semi: false
    quotes: [ 'warn', 'single' ], // singleQuote: true
    'quote-props': [ 'warn', 'as-needed' ], //quoteProps: 'as-needed'
    'jsx-quotes': [ 'warn', 'prefer-single' ], // jsxSingleQuote: false
    'comma-dangle': [ 'warn', 'always-multiline' ], // ?trailingComma: 'es5'
    'array-bracket-spacing': [ 'warn', 'always' ], // ?bracketSpacing: true
    'array-bracket-newline': [ 'warn', 'consistent' ], // ?bracketSameLine: true
    'arrow-parens': [ 'warn', 'as-needed' ], //arrowParens: 'avoid'
    'eol-last': [ 'warn', 'always' ], // endOfLine: 'lf'
  }
}
