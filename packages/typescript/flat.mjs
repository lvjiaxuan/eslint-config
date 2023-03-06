import eslint from 'eslint'
import javascript from '@lvjiaxuan/eslint-config-js/flat'
import tsParser from '@typescript-eslint/parser'
import typescript from '@typescript-eslint/eslint-plugin'
import index from './index'

const config = index.overrides[0]

/**
 * @type {Array.<eslint.Linter.FlatConfig>}
 */
export default [
  ...javascript,

  // plugin:@typescript-eslint/recommended
  // https://github.dev/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/recommended.ts#L1
  //
  // plugin:@typescript-eslint/recommended-requiring-type-checking
  // https://github.dev/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/recommended-requiring-type-checking.ts#L1
  {
    files: config.files,
    ignores: config.excludedFiles,
    plugins: { '@typescript-eslint': typescript },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tsParser,
      parserOptions: config.parserOptions,
    },
    rules: {
      ...typescript.configs['eslint-recommended'].rules,
      ...typescript.configs['recommended'].rules,
      ...typescript.configs['recommended-requiring-type-checking'].rules,
      ...index.rules,
    },
  },
]
