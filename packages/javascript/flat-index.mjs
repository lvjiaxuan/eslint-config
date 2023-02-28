import comments from 'eslint-plugin-eslint-comments'
import promise from 'eslint-plugin-promise'
import jsonc from 'eslint-plugin-jsonc'
import markdown from 'eslint-plugin-markdown'
import eslint from 'eslint'
import globals from 'globals'
import js from "@eslint/js"
import index from './index'
import basic from './basic'

/**
 * @type {Array.<eslint.Linter.FlatConfig>}
 * @link https://eslint.org/docs/latest/use/configure/configuration-files-new
 */
export default [

  js.configs.recommended,
  comments.configs.recommended,
  promise.configs.recommended,
  jsonc.configs['recommended-with-jsonc'],
  markdown.recommended,

  // general **/*.js, **/*.cjs, and **/*.mjs
  {
    // files **/*.js, **/*.cjs, and **/*.mjs by default

    ignores: basic.ignorePatterns,

    linterOptions: {
      reportUnusedDisableDirectives: true,
      noInlineConfig: false,
    },

    languageOptions: {
      // ecmaVersion latest by default
      // sourceType .ext depended by default
      // parser https://github.com/eslint/espree by default
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      'parserOptions': {
        'ecmaFeatures': {
          'jsx': true,
          globalReturn: false,
          impliedStrict: true
        }
      }
    },

    rules: index.rules,
  },

  // package.json
  {
    files: ['package.json'],
    languageOptions: {
      parser: jsonc.parseForESLint // jsonc-eslint-parser
    },
    rules: {
      'jsonc/sort-keys': [
        'error',
        {
          pathPattern: '^$',
          order: [
            'publisher',
            'name',
            'displayName',
            'type',
            'version',
            'private',
            'packageManager',
            'description',
            'author',
            'license',
            'funding',
            'homepage',
            'repository',
            'bugs',
            'keywords',
            'categories',
            'sideEffects',
            'exports',
            'main',
            'module',
            'unpkg',
            'jsdelivr',
            'types',
            'typesVersions',
            'bin',
            'icon',
            'files',
            'engines',
            'activationEvents',
            'contributes',
            'scripts',
            'peerDependencies',
            'peerDependenciesMeta',
            'dependencies',
            'optionalDependencies',
            'devDependencies',
            'pnpm',
            'overrides',
            'resolutions',
            'husky',
            'simple-git-hooks',
            'lint-staged',
            'eslintConfig',
          ],
        },
        {
          pathPattern: '^(?:dev|peer|optional|bundled)?[Dd]ependencies$',
          order: { type: 'asc' },
        },
        {
          pathPattern: '^exports.*$',
          order: [ 'types', 'require', 'import' ],
        },
      ],
    },
  }
]

