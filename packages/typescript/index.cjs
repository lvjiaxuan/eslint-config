const tsRules = require('./tsRules.json')

module.exports = {
  extends: '@lvjiaxuan/js',

  overrides: [
    {
      files: [ '**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts' ],

      excludedFiles: [ '**/*.md/*.*' ],

      extends: [
        /**
         * Already includes:
         * 1. parser: '@typescript-eslint/parser'
         * 2. plugins: ['@typescript-eslint']
         */
        // 'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-type-checked',
        'plugin:@typescript-eslint/stylistic-type-checked',
      ],

      parserOptions: {
        // https://typescript-eslint.io/docs/linting/type-linting
        tsconfigRootDir: process.cwd(),
        // https://typescript-eslint.io/linting/typed-linting/monorepos#wide-globs-in-parseroptionsproject
        project: [ './tsconfig.json', './tsconfig.*.json', './packages/*/tsconfig.json' ],
      },

      rules: {
        // https://typescript-eslint.io/rules/
        '@typescript-eslint/ban-ts-comment': [
          'warn', {
            'ts-check': 'allow-with-description',
            'ts-expect-error': 'allow-with-description',
            'ts-ignore': 'allow-with-description',
            'ts-nocheck': 'allow-with-description',
            // minimumDescriptionLength?: number;
          },
        ],
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-explicit-any': [ 'warn', { fixToUnknown: false, ignoreRestArgs: true } ],
        '@typescript-eslint/no-misused-promises': [
          'warn', {
            checksConditionals: true,
            checksSpreads: true,
            checksVoidReturn: false,
          },
        ],
        '@typescript-eslint/no-unsafe-return': 'warn',
        '@typescript-eslint/unbound-method': 'off',
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': [
          'warn', {
            // extend
            functions: false,
            classes: false,
            variables: false,
            allowNamedExports: true,
            // additional
            enums: true,
            typedefs: false,
            ignoreTypeReferences: true,
          },
        ],

        // js to ts
        ...tsRules,

        // https://typescript-eslint.io/linting/troubleshooting#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
        'no-undef': 'off',
      },
    },
  ],
}
