import javascript from '@lvjiaxuan/eslint-config-js/flat'
import * as tsParser from '@typescript-eslint/parser'
import typescript from '@typescript-eslint/eslint-plugin'
import index from './index.cjs'

const config = index.overrides[0]
const tsconfigJsonConfig = index.overrides[1]

/**
 * @type {Array.<import('eslint').Linter.FlatConfig>}
 */
export default [
  ...javascript,

  // plugin:@typescript-eslint/recommended-type-checked
  // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/recommended-type-checked.ts
  // plugin:@typescript-eslint/stylistic-type-checked
  // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/stylistic-type-checked.ts
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
      ...typescript.configs['eslint-recommended'].overrides[0].rules,
      ...typescript.configs['recommended-type-checked'].rules,
      ...typescript.configs['stylistic-type-checked'].rules,
      ...config.rules,
    },
  },
  tsconfigJsonConfig,
]
