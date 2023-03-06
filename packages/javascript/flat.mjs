import commentsPlugin from 'eslint-plugin-eslint-comments'
import promisePlugin from 'eslint-plugin-promise'
import jsoncPlugin from 'eslint-plugin-jsonc'
import markdownPlugin from 'eslint-plugin-markdown'
import ymlPlugin from 'eslint-plugin-yml'
import ymlParser from 'yaml-eslint-parser'
import eslint from 'eslint'
import globals from 'globals'
import js from '@eslint/js'
import index from './index'
import basic from './basic'


/**
 * @description A temporary compat
 * @param {eslint.ESLint.plugin} plugin
 * @returns {eslint.Linter.FlatConfig}
 */
export const compatPluginConfig = (plugin, name = 'recommended') => {
  // It seems that `@eslint/eslintrc` could only be used in `eslint.config.js` of root rather than packing it for import.
  // So I need to do a temporary compatibility by myself.

  /** @type {eslint.Linter.FlatConfig} */
  const flatConfig = {}

  flatConfig.plugins = { [plugin.configs[name].plugins[0]]: plugin }
  flatConfig.rules = plugin.configs[name].rules ?? {}

  return flatConfig
}

/**
 * @returns {eslint.Linter.FlatConfig}
 */
export const compatJsoncPluginConfig = () => ({
  // jsoncPlugin.configs['recommended-with-jsonc']
  // https://github.dev/ota-meshi/eslint-plugin-jsonc/blob/master/lib/index.ts#L45

  files: jsoncPlugin.configs.base.overrides[0].files, // [ '**/*.json', '**/*.json5', '**/*.jsonc' ],
  plugins: { jsonc: jsoncPlugin },
  languageOptions: { parser: jsoncPlugin },
  rules: {
    ...jsoncPlugin.configs.base.rules,
    ...jsoncPlugin.configs['recommended-with-jsonc'].rules,
  },
})

/**
 * @returns {Array.<eslint.Linter.FlatConfig>}
 */
export const compatYmlPluginConfig = () => ({
  // ymlPlugin.configs.standard
  // https://github.dev/ota-meshi/eslint-plugin-yml/blob/master/src/configs/standard.ts#L1
  files: ymlPlugin.configs.base.overrides[0].files, // [ '**/*.yaml', '**/*.yml' ],
  plugins: { yml: ymlPlugin },
  languageOptions: { parser: ymlParser },
  rules: {
    ...ymlPlugin.configs.base.rules,
    ...ymlPlugin.configs.standard.rules,
  },
})

/**
 * @returns {Array.<eslint.Linter.FlatConfig>}
 */
export const compatMarkdownPluginConfigs = () => {
  // markdownPlugin.configs.recommended
  // https://eslint.org/docs/latest/use/configure/configuration-files-new#using-processors
  // https://github.dev/eslint/eslint-plugin-markdown/blob/main/lib/index.js#L42

  const recommended = markdownPlugin.configs.recommended

  /** @type {eslint.Linter.FlatConfig} */
  const flatA = {
    files: recommended.overrides[0].files, // [ '**/*.md' ],
    plugins: {
      // markdown plugin name
      [recommended.plugins[0]]: markdownPlugin,
    },
    processor: recommended.overrides[0].processor,
  }

  /** @type {eslint.Linter.FlatConfig} */
  const flatB = {
    files: recommended.overrides[1].files,
    languageOptions: { parserOptions: recommended.overrides[1].parserOptions },
    rules: recommended.overrides[1].rules,
  }

  return [ flatA, flatB ]
}


/**
 * @type {Array.<eslint.Linter.FlatConfig>}
 * @link https://eslint.org/docs/latest/use/configure/configuration-files-new
 */
export default [
  // Globally ignoring
  { ignores: basic.ignorePatterns },

  // eslint:recommended
  js.configs.recommended,

  // plugin:promise/recommended
  compatPluginConfig(promisePlugin),

  // plugin:eslint-comments/recommended
  compatPluginConfig(commentsPlugin),

  // plugin:jsonc/recommended-with-jsonc
  compatJsoncPluginConfig(),

  // plugin:yml/standard
  compatYmlPluginConfig(),

  // plugin:markdown/recommended
  ...compatMarkdownPluginConfigs(),

  { // **/*.js, **/*.cjs, and **/*.mjs by default
    linterOptions: {
      reportUnusedDisableDirectives: true,
      noInlineConfig: false,
    },

    languageOptions: {
      // ecmaVersion latest by default
      // sourceType depended by .ext by default
      // parser https://github.com/eslint/espree by default
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
          globalReturn: false,
          impliedStrict: true,
        },
      },
    },

    rules: index.rules,
  },

  // other more
  ...index.overrides,
]
