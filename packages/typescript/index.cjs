const tsRules = require('./tsRules.json')

module.exports = {
  extends: '@lvjiaxuan/js',

  overrides: [
    {
      files: [ '**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts' ],

      excludedFiles: [ '**/*.md/*.*' ],

      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],

      parserOptions: {
        // https://typescript-eslint.io/docs/linting/type-linting
        tsconfigRootDir: process.cwd(),
        // https://typescript-eslint.io/linting/typed-linting/monorepos#wide-globs-in-parseroptionsproject
        project: [ './tsconfig.json', './tsconfig.eslint.json', './packages/*/tsconfig.json' ],
      },

      rules: {
        // https://typescript-eslint.io/rules/
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-misused-promises': [ 'warn', { checksVoidReturn: false } ],
        '@typescript-eslint/no-unsafe-return': 'warn',
        '@typescript-eslint/unbound-method': 'off',
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
      },
    },
  ],
}
