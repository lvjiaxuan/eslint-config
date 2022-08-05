module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:eslint-comments/recommended',
    './basic.js',
  ],

  rules: {
    // https://eslint.org/docs/rules/

    // My custom rules
    indent: [ 'warn', 2 ],
    semi: [ 'warn', 'never' ], // prettier semi: false
    quotes: [ 'warn', 'single' ], // prettier singleQuote: true
    'no-empty': [ 'error', { allowEmptyCatch: true } ],
    'no-empty-function': 'warn',
    'no-tabs': [ 'warn', { allowIndentationTabs: false } ], // prettier useTabs: false; allowIndentationTabs 这里指非代码行的缩进
    'no-unused-vars': 'off', // tree shaking would helps
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
    'no-multi-spaces': 'warn',
    'max-len': [ 'warn', { code: 120, tabWidth: 2, ignoreComments: true, ignoreStrings: true, ignoreTemplateLiterals: true } ], // prettier printWidth: 120 tabWidth: 2
    'quote-props': [ 'warn', 'as-needed' ], // prettier quoteProps: 'as-needed'
    'jsx-quotes': [ 'warn', 'prefer-single' ], // prettier jsxSingleQuote: false
    'comma-dangle': [ 'warn', 'always-multiline' ], // prettier like trailingComma: 'es5'
    'arrow-parens': [ 'warn', 'as-needed' ], // prettier arrowParens: 'avoid'
    'eol-last': [ 'warn', 'always' ], // prettier endOfLine: 'lf'
    'no-extra-parens': 'warn',

    // Possible Problems which are not included in recommended rules
    'array-callback-return': 'error',
    'no-await-in-loop': 'warn',
    'no-constant-binary-expression': 'warn',
    'no-constructor-return': 'warn',
    'no-duplicate-imports': 'warn',
    'no-promise-executor-return': 'warn',
    'no-self-compare': 'error',
    'no-template-curly-in-string': 'warn',
    'no-unmodified-loop-condition': 'error',
    'no-unreachable-loop': 'warn',
    'no-unused-private-class-members': 'off',
    'no-use-before-define': [
      'error', {
        functions: false,
        classes: false,
        variables: false,
        allowNamedExports: true,
      },
    ],
    'require-atomic-updates': 'error',

    // Layout & Formatting
    'no-multiple-empty-lines': [ 'warn', { max: 2 } ],

    // object-*
    'object-curly-spacing': [ 'warn', 'always' ],
    'object-curly-newline': [ 'warn', { multiline: true } ],
    'object-property-newline': [ 'warn', { allowAllPropertiesOnSameLine: true } ],

    // array-*
    // 'array-element-newline': [ 'warn', { multiline: true } ],
    'array-bracket-spacing': [ 'warn', 'always' ], // prettier: like bracketSpacing: true
    'array-bracket-newline': [ 'warn', { multiline: true } ], // prettier: like bracketSameLine: true

    // spacing
    'template-curly-spacing': [ 'warn', 'always' ],
    'spaced-comment': [ 'warn', 'always' ],
    'comma-spacing': 'warn',
    'arrow-spacing': [ 'warn', { before: true, after: true } ],
    'keyword-spacing': 'warn',
    'key-spacing': 'warn',
    'block-spacing': 'warn',
    'no-trailing-spaces': 'warn',
    'space-infix-ops': 'warn',
    'space-in-parens': [ 'warn', 'never' ],

    // clone prettier-plugin rule
    'prettier/prettier': 'off',
  },
}
