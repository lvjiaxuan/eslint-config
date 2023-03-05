import eslint from 'eslint'
import javascript from '@lvjiaxuan/eslint-config-js/flat'
import tsParser from '@typescript-eslint/parser'
import typescript from '@typescript-eslint/eslint-plugin'
import index from './index'


/**
 * @type {Array.<eslint.Linter.FlatConfig>}
 */
export default [
  ...javascript,

  {
    files: ['**/*.ts','**/*.d.ts','**/*.tsx', '**/*.mts', '**/*.cts'], // '**/*.vue'
    plugins: {
      '@typescript-eslint': typescript
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: index.overrides[0].parserOptions
    },
    rules: {
      ...typescript.configs['eslint-recommended'].rules,
      ...typescript.configs['recommended'].rules,
      ...typescript.configs['recommended-requiring-type-checking'].rules,
      ...index.rules
    }
  },
]