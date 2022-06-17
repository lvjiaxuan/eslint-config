const cwd = process.cwd()

module.exports = {
  // overrides: [
  //   {
  //     files: [ '*.ts' ],
     
  //     parser: '@typescript-eslint/parser',

  //     parserOptions: {
  //       // #https://typescript-eslint.io/docs/linting/type-linting
  //       tsconfigRootDir: cwd,
  //       project: ['./tsconfig.json'],
  //     },
    
  //     extends: [
  //       '@lvjiaxuan/js',
  //       // #https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/recommended.ts
  //       'plugin:@typescript-eslint/recommended',
  //       'plugin:@typescript-eslint/recommended-requiring-type-checking',
  //     ],
    
  //     rules: {
  //       '@typescript-eslint/no-unused-vars': 'off',
  //       '@typescript-eslint/no-empty-function': 'warn',
  //       '@typescript-eslint/ban-ts-comment': 'off',
  //       '@typescript-eslint/no-non-null-assertion': 'off',
  //       '@typescript-eslint/no-explicit-any': 'off',
  //     },
  //   },
  // ],

  parser: '@typescript-eslint/parser',

  // parserOptions: {
  //   // #https://typescript-eslint.io/docs/linting/type-linting
  //   tsconfigRootDir: cwd,
  //   project: ['./tsconfig.json'],
  // },

  extends: [
    '@lvjiaxuan/js',
    // #https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/recommended.ts
    'plugin:@typescript-eslint/recommended',
    // 'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],

  rules: {
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-empty-function': 'warn',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
}
