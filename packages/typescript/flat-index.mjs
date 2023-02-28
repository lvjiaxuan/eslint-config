import eslint from 'eslint'
import javascript from '@lvjiaxuan/eslint-config-js/flat'
import tsParser from '@typescript-eslint/parser'
import typescript from '@typescript-eslint/eslint-plugin'
import index from './index'

/**
 * @type {Array.<eslint.Linter.FlatConfig>}
 */
export default [
  javascript,
  
  {
    files: ['**/*.ts','**/*.d.ts','**/*.tsx', '**.vue'],
    ...typescript.configs['recommended-requiring-type-checking'],
    ...typescript.configs.recommended,
    'languageOptions': {
      parser: tsParser.parseForESLint,
      'parserOptions': index.overrides[0].parserOptions
    },
    rules: index.overrides[0].rules
  }
]