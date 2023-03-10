// import lvjiaxuan from '@lvjiaxuan/eslint-plugin/flat'

// /** @type {import('eslint').Linter.FlatConfig} */
// export default [
//   { ignores: [ 'packages/typescript/tsRules.json' ] },
//   ...lvjiaxuan.configs.recommended,
// ]
const lv = require('@lvjiaxuan/eslint-plugin/flat')
module.exports = [
  { ignores: [ 'packages/typescript/tsRules.json' ] },
  ...lv.configs.recommended,
]
