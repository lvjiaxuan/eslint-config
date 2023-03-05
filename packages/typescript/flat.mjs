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
    files: ['**/*.ts','**/*.d.ts','**/*.tsx', '**/*.vue', '**/*.mts', '**/*.cts'],
    plugins: {
      '@typescript-eslint': typescript
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        // https://typescript-eslint.io/docs/linting/type-linting
        tsconfigRootDir: process.cwd(),
        // https://typescript-eslint.io/linting/typed-linting/monorepos
        project: [ './tsconfig.json', './tsconfig.eslint.json', './packages/*/tsconfig.json' ],
        // https://typescript-eslint.io/docs/linting/troubleshooting/#i-use-a-framework-like-vue-that-requires-custom-file-extensions-and-i-get-errors-like-you-should-add-parseroptionsextrafileextensions-to-your-config
        extraFileExtensions: [ '.vue' ],
      }
    },
    rules: {
      ...typescript.configs['eslint-recommended'].rules,
      ...typescript.configs['recommended'].rules,
      ...typescript.configs['recommended-requiring-type-checking'].rules,
      ...index.rules
    }
  },
]