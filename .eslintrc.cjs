require('@rushstack/eslint-patch/modern-module-resolution')

/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  extends: 'plugin:@lvjiaxuan/recommended',
  ignorePatterns: [ 'packages/typescript/tsRules.json' ],
}
