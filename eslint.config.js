import lvjiaxuan from '@lvjiaxuan/eslint-plugin/flat'

/** @type {import('eslint').Linter.FlatConfig} */
export default [
  { ignores: [ 'packages/typescript/tsRules.json' ] },
  ...lvjiaxuan.configs.recommended,
]
