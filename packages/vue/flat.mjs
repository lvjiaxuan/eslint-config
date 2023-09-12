import typescript from '@lvjiaxuan/eslint-config-ts/flat'
import vue from 'eslint-plugin-vue'
import * as tsParser from '@typescript-eslint/parser'
import vueParser from 'vue-eslint-parser'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import vueTSConfig from '@vue/eslint-config-typescript'
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
    // https://github.com/vuejs/eslint-plugin-vue/blob/master/lib/configs/vue3-recommended.js
    files,
    plugins: { vue },
    processor: vue.processors['.vue'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: vueParser,
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
    rules: {
      ...vue.configs.base.rules,
      ...vue.configs['vue3-essential'].rules,
      ...vue.configs['vue3-strongly-recommended'].rules,
      ...vue.configs['vue3-recommended'].rules,
      ...index.rules,
    },
  },

  { // @vue/eslint-config-typescript/recommended
    // https://github.com/vuejs/eslint-config-typescript/blob/main/recommended.js
    files,
    plugins: { '@typescript-eslint': tsPlugin },
    languageOptions: {
      // parser: vueParser has already been set above.
      parserOptions: {
        ...vueTSConfig.parserOptions,
        ts: tsParser,
        tsx: tsParser,
      },
    },
    rules: {
      ...tsPlugin.configs['eslint-recommended'].overrides[0].rules,
      ...tsPlugin.configs['recommended'].rules,
      ...vueTSRecommended.rules,
    },
  },

  // https://github.com/vuejs/eslint-config-typescript/blob/157fd85c5bb1340d11b6a632c24e49c3cfe22778/index.js#L28
  {
    files: [ '**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts', '**/*.vue' ],
    rules: {
      // The core 'no-unused-vars' rules (in the eslint:recommeded ruleset)
      // does not work with type definitions
      'no-unused-vars': 'off',
      // TS already checks for that, and Typescript-Eslint recommends to disable it
      // https://typescript-eslint.io/linting/troubleshooting#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
      'no-undef': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },


  // https://github.com/vuejs/eslint-config-typescript/blob/157fd85c5bb1340d11b6a632c24e49c3cfe22778/recommended.js#L31
  {
    files: [ 'shims-tsx.d.ts' ],
    rules: {
      '@typescript-eslint/no-empty-interface': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
  {
    files: [ '**/*.js', '**/*.cjs' ],
    rules: {
      // in plain CommonJS modules, you can't use `import foo = require('foo')` to pass this rule, so it has to be disabled
      '@typescript-eslint/no-var-requires': 'off',
    },
  },
]
