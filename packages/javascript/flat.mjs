import comments from 'eslint-plugin-eslint-comments'
import promise from 'eslint-plugin-promise'
import jsonc from 'eslint-plugin-jsonc'
import markdown from 'eslint-plugin-markdown'
import eslint from 'eslint'
import globals from 'globals'
import js from '@eslint/js'
import index from './index'
import basic from './basic'


/**
 * @description a simple compat
 * @param {eslint.ESLint.ConfigData} config 
 * @returns {flatConfig}
 */
const compatPluginConfig = (plugin, name = 'recommended') => {
  // It seems that `@eslint/eslintrc` could only be used in `eslint.config.js` rather than packing it before using.
  // So I need to do a simple compatibility by myself.

  /** @type {eslint.Linter.FlatConfig} */
  const flatConfig = {}

  // string[] to name-value
  flatConfig.plugins = { [plugin.configs[name].plugins[0]]: plugin }
  // maintain
  flatConfig.rules = config.rules ?? {}

  return flatConfig
}

/**
 * @type {Array.<eslint.Linter.FlatConfig>}
 * @link https://eslint.org/docs/latest/use/configure/configuration-files-new
 */
export default  [
  js.configs.recommended,
  // comments.configs.recommended,
  compatPluginConfig(comments),
  // promise.configs.recommended,
  compatPluginConfig(promise),
  jsonc.configs['recommended-with-jsonc'],
  compatPluginConfig(jsonc, 'recommended-with-jsonc'),
  markdown.recommended,

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