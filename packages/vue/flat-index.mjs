import eslint from 'eslint'
import typescript from '@lvjiaxuan/eslint-config-ts/flat'
import vue3 from 'eslint-plugin-vue'
import common from './common.json' assert { type: 'json' }
import tsParser from '@typescript-eslint/parser'


/**
 * @type {Array.<eslint.Linter.FlatConfig>}
 */
export default [
  typescript,

  {
    files: [ '**/*.vue'],
    ...vue3.configs['vue3-recommended'],
    languageOptions: {
      'parserOptions': {
        parser: {
          // js espree by default
          ts: tsParser
        }
      }
    },
    rules: common.rules
  }
]