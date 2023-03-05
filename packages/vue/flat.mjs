import eslint from 'eslint'
import typescript from '@lvjiaxuan/eslint-config-ts/flat'
import vue from 'eslint-plugin-vue'
import tsParser from '@typescript-eslint/parser'
import vueParser from 'vue-eslint-parser'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import vueTSConfig from '@vue/eslint-config-typescript'
import vueTSRecommendedConfig from '@vue/eslint-config-typescript/recommended.js'
import index from './index'


/**
 * @type {Array.<eslint.Linter.FlatConfig>}
 */
export default [
  ...typescript,

  {
    files: [ '**/*.vue'],
    plugins: {
      vue
    },
    languageOptions: {
      parser: vueParser,
    },
    rules: {
      ...vue.configs.base.rules,
      ...vue.configs['vue3-essential'].rules,
      ...vue.configs['vue3-strongly-recommended'].rules,
      ...vue.configs.recommended.rules,
      ...index.rules
    }
  },

  { // for ts
    files: [ '**/*.vue'],
    plugins: {
      '@typescript-eslint': tsPlugin
    },
    languageOptions: {
      parserOptions: vueTSConfig.parserOptions
    }
  },

  {
    files: ['**/*.ts', '**/*.tsx', '**/*.vue'],
    rules: {
      ...vueTSConfig.overrides[0].rules,
      ...vueTSRecommendedConfig.rules
    }
  },

  ...vueTSRecommendedConfig.overrides
]