module.exports = {
  extends: [ 'eslint:recommended' ],

  rules: {
    // My base rules #https://eslint.org/docs/rules/
    'no-empty': [ 'error', { allowEmptyCatch: true } ],
    'no-unused-vars': 'off', // tree shaking help
    'no-empty-function': 'warn',
    indent: [ 'warn', 2 ],
    'template-curly-spacing': [ 'warn', 'always' ],
    'sort-imports': [
      'warn',
      {
        ignoreCase: false,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: [ 'none', 'all', 'multiple', 'single' ],
        allowSeparatedGroups: false,
      },
    ],

    // my prettierrc rules
    'prettier/prettier': 'off',
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
    // non rangeStart
    // non rangeEnd
    // non requirePragma
    // non insertPragma
  },
}
