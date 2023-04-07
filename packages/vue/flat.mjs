import typescript from '@lvjiaxuan/eslint-config-ts/flat'
import vue from 'eslint-plugin-vue'
import * as tsParser from '@typescript-eslint/parser'
import vueParser from 'vue-eslint-parser'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import vueTS from '@vue/eslint-config-typescript'
import vueTSRecommended from '@vue/eslint-config-typescript/recommended.js'
import globals from 'globals'
import index from './index.cjs'

const files = [ '**/*.vue' ]

/**
 * @type {Array.<import('eslint').Linter.FlatConfig>}
 */
export default [
  ...typescript,

  { // plugin:vue/vue3-recommended
    // https://github.dev/vuejs/eslint-plugin-vue/blob/master/lib/configs/vue3-recommended.js#L1
    files,
    plugins: { vue },
    processor: vue.processors['.vue'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: vueParser,
      globals: { ...globals.browser },
    },
    rules: {
      ...vue.configs.base.rules,
      ...vue.configs['vue3-essential'].rules,
      ...vue.configs['vue3-strongly-recommended'].rules,
      ...vue.configs.recommended.rules,
      ...index.rules,
    },
  },

  { // @vue/eslint-config-typescript/recommended
    // https://github.dev/vuejs/eslint-config-typescript/blob/main/recommended.js#L1
    files,
    plugins: { '@typescript-eslint': tsPlugin },
    languageOptions: {
      // parser: vueParser on above,
      parserOptions: {
        ...vueTS.parserOptions,
        ts: tsParser,
        tsx: tsParser,
      },
    },
    rules: {
      ...tsPlugin.configs['eslint-recommended'].rules,
      ...vueTSRecommended.rules,
    },
  },

  // ...vueTS.overrides,
  ...vueTSRecommended.overrides,
]
