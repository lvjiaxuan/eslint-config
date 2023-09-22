module.exports = {
  extends: './basic.js',

  rules: {
    // https://eslint.org/docs/rules/

    // Possible Problems which are not included in recommended rules
    'array-callback-return': [ 'error', { allowImplicit: true, checkForEach: false } ],
    'no-await-in-loop': 'error',
    'no-constant-binary-expression': 'warn',
    'no-constructor-return': 'error',
    'no-duplicate-imports': 'warn',
    'no-new-native-nonconstructor': 'error',
    'no-promise-executor-return': 'warn',
    'no-self-compare': 'error',
    'no-template-curly-in-string': 'warn',
    'no-unmodified-loop-condition': 'off',
    'no-unreachable-loop': 'error',
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

    // My custom
    indent: [
      'warn', 2, {
        SwitchCase: 1,
        VariableDeclarator: 1,
        outerIIFEBody: 1,
        MemberExpression: 1,
        FunctionDeclaration: { parameters: 1, body: 1 },
        FunctionExpression: { parameters: 1, body: 1 },
        CallExpression: { arguments: 1 },
        ArrayExpression: 1,
        ObjectExpression: 1,
        ImportDeclaration: 1,
        flatTernaryExpressions: false,
        ignoreComments: false,
        ignoredNodes: [ 'TemplateLiteral *', 'JSXElement', 'JSXElement > *', 'JSXAttribute', 'JSXIdentifier', 'JSXNamespacedName', 'JSXMemberExpression', 'JSXSpreadAttribute', 'JSXExpressionContainer', 'JSXOpeningElement', 'JSXClosingElement', 'JSXFragment', 'JSXOpeningFragment', 'JSXClosingFragment', 'JSXText', 'JSXEmptyExpression', 'JSXSpreadChild' ],
        offsetTernaryExpressions: true,
      },
    ],
    semi: [ 'warn', 'never' ], // prettier semi: false
    quotes: [ 'warn', 'single' ], // prettier singleQuote: true
    'no-empty': [ 'error', { allowEmptyCatch: true } ],
    'no-empty-function': 'warn',
    'no-tabs': [ 'warn', { allowIndentationTabs: false } ], // prettier useTabs: false; allowIndentationTabs 这里指非代码行的缩进
    'no-unused-vars': 'off', // tree shaking would help
    'sort-imports': [
      'warn',
      {
        // The default setting.
        ignoreCase: false,
        ignoreDeclarationSort: false,
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
    'arrow-body-style': [ 'warn', 'as-needed', { requireReturnForObjectLiteral: false } ],
    // 'default-param-last': 'off',
    'no-invalid-this': 'error',
    'no-loop-func': 'error',
    'no-magic-numbers': [
      'warn', {
        ignore: [ 0, 1 ],
        // ignoreArrayIndexes: false,
        // ignoreDefaultValues: false,
        // ignoreClassFieldInitialValues: false,
        enforceConst: true,
        // detectObjects: false,
      },
    ],
    'no-restricted-imports': 'off',
    'no-shadow': [
      'warn', {
        builtinGlobals: true,
        // hoist: 'functions',
        // allow: [],
        // ignoreOnInitialization: false,
      },
    ],
    'no-unused-expressions': [
      'warn', {
        allowShortCircuit: true,
        allowTernary: true,
        allowTaggedTemplates: true,
        enforceForJSX: false,
      },
    ],

    // Layout & Formatting
    'no-multiple-empty-lines': [ 'warn', { max: 2 } ],
    'no-extra-parens': 'warn',

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

  overrides: [
    {
      files: [ '**/*.yaml', '**/*.yml' ],
      // parser: 'yaml-eslint-parser',
      rules: { 'spaced-comment': 'off' },
    },
    {
      files: [ '**/*.json', '**/*.json5' ],
      // parser: 'jsonc-eslint-parser',
      rules: {
        'jsonc/array-bracket-spacing': [ 'error', 'never' ],
        'jsonc/comma-dangle': [ 'error', 'never' ],
        'jsonc/comma-style': [ 'error', 'last' ],
        'jsonc/indent': [ 'error', 2 ],
        'jsonc/key-spacing': [ 'error', { beforeColon: false, afterColon: true } ],
        'jsonc/no-octal-escape': 'error',
        'jsonc/object-curly-newline': [ 'error', { multiline: true, consistent: true } ],
        'jsonc/object-curly-spacing': [ 'error', 'always' ],
        'jsonc/object-property-newline': [ 'error', { allowMultiplePropertiesPerLine: true } ],
      },
    },
    {
      files: [ '**/package.json' ],
      // parser: 'jsonc-eslint-parser',
      rules: {
        'jsonc/sort-keys': [
          'error',
          {
            pathPattern: '^$',
            order: [
              'publisher',
              'name',
              'displayName',
              'type',
              'version',
              'private',
              'packageManager',
              'description',
              'author',
              'license',
              'funding',
              'homepage',
              'repository',
              'bugs',
              'keywords',
              'categories',
              'sideEffects',
              'exports',
              'main',
              'module',
              'unpkg',
              'jsdelivr',
              'types',
              'typesVersions',
              'bin',
              'icon',
              'files',
              'engines',
              'activationEvents',
              'contributes',
              'scripts',
              'peerDependencies',
              'peerDependenciesMeta',
              'dependencies',
              'optionalDependencies',
              'devDependencies',
              'pnpm',
              'overrides',
              'resolutions',
              'husky',
              'simple-git-hooks',
              'lint-staged',
              'eslintConfig',
            ],
          },
          {
            pathPattern: '^(?:dev|peer|optional|bundled)?[Dd]ependencies$',
            order: { type: 'asc' },
          },
          {
            pathPattern: '^resolutions$',
            order: { type: 'asc' },
          },
          {
            pathPattern: '^pnpm.overrides$',
            order: { type: 'asc' },
          },
          {
            pathPattern: '^exports.*$',
            order: [
              'types',
              'import',
              'require',
              'default',
            ],
          },
        ],
      },
    },
  ],
}
