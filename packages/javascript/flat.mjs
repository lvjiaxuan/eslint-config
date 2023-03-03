import commentsPlugin from 'eslint-plugin-eslint-comments'
import promisePlugin from 'eslint-plugin-promise'
import jsoncPlugin from 'eslint-plugin-jsonc'
import markdownPlugin from 'eslint-plugin-markdown'
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

  // string[] to name-value
  flatConfig.plugins = { [plugin.configs[name].plugins[0]]: plugin }
  // maintain
  flatConfig.rules = config.rules ?? {}

  return flatConfig
}

/**
 * @returns {eslint.Linter.FlatConfig}
 */
export const compatJsoncPluginConfig = () =>({
  // jsoncPlugin.configs['recommended-with-jsonc']
  files: ["**/*.json", "**/*.json5", "**/*.jsonc"],
  plugins: { jsonc: jsoncPlugin },
  languageOptions: {
    parser: jsoncPlugin.parseForESLint
  },
  rules: {
    strict: "off",
    "no-unused-expressions": "off",
    "no-unused-vars": "off",
    ...jsoncPlugin.configs['recommended-with-jsonc'].rules,
  }
})

/**
 * @returns {Array.<eslint.Linter.FlatConfig>}
 */
export const compatMarkdownPluginConfig = () => {
  // markdownPlugin.configs.recommended

  const recommended = markdownPlugin.configs.recommended

  const base = {
    plugins: {
      [recommended.plugins[0]]: markdownPlugin
    }
  }

  return recommended.overrides.reduce((preValue, item) => {

      /** @type {eslint.Linter.FlatConfig} */
    const flatConfig = base

    flatConfig.files = item.files
    item.processor && (flatConfig.processor = item.processor)
    if(item.parserOptions) {
      flatConfig.languageOptions = {}
      flatConfig.languageOptions.parserOptions = item.parserOptions
    }
    item.rules && (flatConfig.rules = item.rules)

    preValue.push(flatConfig)
    return preValue
  }, [])
}

/**
 * @type {Array.<eslint.Linter.FlatConfig>}
 * @link https://eslint.org/docs/latest/use/configure/configuration-files-new
 */
export default  [
  js.configs.recommended,

  // comments.configs.recommended,
  compatPluginConfig(commentsPlugin),

  // promise.configs.recommended,
  compatPluginConfig(promisePlugin),

  // jsonc.configs['recommended-with-jsonc']
  compatJsoncPluginConfig(),

  // markdownPlugin.configs.recommended,
  compatMarkdownPluginConfig()

  // // **/*.js, **/*.cjs, and **/*.mjs by default
  // {
  //   ignores: basic.ignorePatterns,

  //   linterOptions: {
  //     reportUnusedDisableDirectives: true,
  //     noInlineConfig: false,
  //   },

  //   languageOptions: {
  //     // ecmaVersion latest by default
  //     // sourceType .ext depended by default
  //     // parser https://github.com/eslint/espree by default
  //     globals: {
  //       ...globals.browser,
  //       ...globals.node,
  //     },
  //     parserOptions: {
  //       ecmaFeatures: {
  //         jsx: true,
  //         globalReturn: false,
  //         impliedStrict: true,
  //       },
  //     },
  //   },

  //   rules: index.rules,
  // },

  // // package.json
  // {
  //   files: [ 'package.json' ],
  //   languageOptions: {
  //     parser: jsonc.parseForESLint
  //   },
  //   rules: {
  //     'jsonc/sort-keys': [
  //       'error',
  //       {
  //         pathPattern: '^$',
  //         order: [
  //           'publisher',
  //           'name',
  //           'displayName',
  //           'type',
  //           'version',
  //           'private',
  //           'packageManager',
  //           'description',
  //           'author',
  //           'license',
  //           'funding',
  //           'homepage',
  //           'repository',
  //           'bugs',
  //           'keywords',
  //           'categories',
  //           'sideEffects',
  //           'exports',
  //           'main',
  //           'module',
  //           'unpkg',
  //           'jsdelivr',
  //           'types',
  //           'typesVersions',
  //           'bin',
  //           'icon',
  //           'files',
  //           'engines',
  //           'activationEvents',
  //           'contributes',
  //           'scripts',
  //           'peerDependencies',
  //           'peerDependenciesMeta',
  //           'dependencies',
  //           'optionalDependencies',
  //           'devDependencies',
  //           'pnpm',
  //           'overrides',
  //           'resolutions',
  //           'husky',
  //           'simple-git-hooks',
  //           'lint-staged',
  //           'eslintConfig',
  //         ],
  //       },
  //       {
  //         pathPattern: '^(?:dev|peer|optional|bundled)?[Dd]ependencies$',
  //         order: { type: 'asc' },
  //       },
  //       {
  //         pathPattern: '^exports.*$',
  //         order: [ 'types', 'require', 'import' ],
  //       },
  //     ],
  //   },
  // },
]