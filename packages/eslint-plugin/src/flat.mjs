import lvjiaxuan from '@lvjiaxuan/eslint-config/flat'
import index from '.'

const pluginRules = index.rules

/** @type {import('eslint').ESLint.Plugin} */
export default {
  configs: {
    recommended: [
      ...lvjiaxuan,
      {
        files: [ '**/*.js', '**/*.cjs', '**/*.mjs', '**/*.ts', '**/*.d.ts', '**/*.tsx', '**/*.mts', '**/*.cts' ],
        plugins: { '@lvjiaxuan': { rules: pluginRules } },
        rules: index.configs.recommended.rules,
      },
    ],
  },
  rules: pluginRules,
}
