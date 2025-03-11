import type { TypedFlatConfigItem } from '@antfu/eslint-config'
import type { TSESLint } from '@typescript-eslint/utils'
import { GLOB_SRC } from '@antfu/eslint-config'
import preferGenericRestExtends from './prefer-generic-rest-extends'

const rulesSetup = {
  'prefer-generic-rest-extends': preferGenericRestExtends,
}

const rulesSettings = {
  '@lvjiaxuan/prefer-generic-rest-extends': 'warn',
} as const // TODO type hints

const pluginName = '@lvjiaxuan'

// For flat config.
export function lvPlugin(): TypedFlatConfigItem {
  return {
    files: [GLOB_SRC],
    name: 'lvjiaxuan/plugins/rules',
    plugins: {
      [pluginName]: { rules: rulesSetup },
    },
    rules: rulesSettings,
  }
}

// For legacy config.
export default {
  rules: rulesSetup,
  configs: {
    recommended: {
      plugins: [pluginName],
      rules: rulesSettings,
    },
  },
} satisfies TSESLint.Linter.Plugin
