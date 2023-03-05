const syncRules = require('./sync-rules')

module.exports = {
  extends: [ '@lvjiaxuan/js' ],

  overrides: [
    {
      files: [ '*.ts', '*.d.ts', '*.tsx', '*.vue' ],

      parser: '@typescript-eslint/parser',

      extends: [
        // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/recommended.ts
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],

      parserOptions: {
        // https://typescript-eslint.io/docs/linting/type-linting
        tsconfigRootDir: process.cwd(),
        // https://typescript-eslint.io/linting/typed-linting/monorepos
        project: [ './tsconfig.json', './tsconfig.eslint.json', './packages/*/tsconfig.json' ],

        // https://typescript-eslint.io/docs/linting/troubleshooting/#i-use-a-framework-like-vue-that-requires-custom-file-extensions-and-i-get-errors-like-you-should-add-parseroptionsextrafileextensions-to-your-config
        extraFileExtensions: [ '.vue' ],
      },

      rules: {
        // https://typescript-eslint.io/rules/
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-misused-promises': [ 'warn', { checksVoidReturn: false } ],
        '@typescript-eslint/no-unsafe-return': 'warn',
        '@typescript-eslint/unbound-method': 'off',

        // sync js
        ...syncRules,

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
      },
    },
  ],
}
