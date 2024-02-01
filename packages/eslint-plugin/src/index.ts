import type { TSESLint } from '@typescript-eslint/utils'
import { type FlatConfigItem, GLOB_SRC } from '@antfu/eslint-config'
import preferGenericRestExtends from './prefer-generic-rest-extends'

const rulesSetup = {
  'prefer-generic-rest-extends': preferGenericRestExtends,
}

const rulesSettings = {
  '@lvjiaxuan/prefer-generic-rest-extends': 'warn',
} as const // Support types later, reference to my oxlint plugin.

// For flat config.
export function lvPlugin(): FlatConfigItem {
  return {
    files: [GLOB_SRC],
    name: '@lvjiaxuan:plugin:setup',
    plugins: {
      '@lvjiaxuan': { rules: rulesSetup },
    },
    rules: rulesSettings,
  }
}

// For legacy config.
export default {
  rules: rulesSetup,
  configs: {
    recommended: {
      plugins: ['@lvjiaxuan'],
      rules: rulesSettings,
    },
  },
} satisfies TSESLint.Linter.Plugin
