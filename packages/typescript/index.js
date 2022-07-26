const syncRules = require('./sync-rules')

module.exports = {
  overrides: [
    {
      files: [ '*.ts', '*.d.ts', '*.tsx' ],

      parser: '@typescript-eslint/parser',

      parserOptions: {
        // #https://typescript-eslint.io/docs/linting/type-linting
        tsconfigRootDir: process.cwd(),
        project: [ './tsconfig.json' ],
      },

      extends: [
        // #https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/recommended.ts
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],

      rules: {
        // #https://typescript-eslint.io/rules/

        // sync js
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-misused-promises': [ 'warn', { checksVoidReturn: false } ],
        ...syncRules,
      },
    },
  ],

  extends: [ '@lvjiaxuan/js' ],
}
