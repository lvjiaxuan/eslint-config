import type { TypedFlatConfigItem } from '@antfu/eslint-config'
import { TSESLint } from '@typescript-eslint/utils'
import type { ESLint, Rule, Linter } from 'eslint'
import { GLOB_TS, GLOB_TSX } from '@antfu/eslint-config'
import preferGenericRestExtends from './prefer-generic-rest-extends'
import { version } from '../package.json'

const pluginName = 'lvjiaxuan'

const pluginRules = {
  'prefer-generic-rest-extends': preferGenericRestExtends,
}

const rulesConfigs: TSESLint.Linter.RulesRecord = {
  [`${pluginName}/prefer-generic-rest-extends`]: 'warn',
}

const plugin = {
  meta: {
    name: '@lvjiaxuan/eslint-plugin',
    version,
  },
  rules: pluginRules,
  configs: {
    'recommended': {
      plugins: [pluginName],
      rules: rulesConfigs,
    },
  },
} satisfies TSESLint.Linter.Plugin
// } satisfies ESLint.Plugin

const flatConfig: TypedFlatConfigItem = {
  name: 'lvjiaxuan/plugin',

  plugins: {
    [pluginName]: plugin
  },

  rules: rulesConfigs,
}

Object.assign(plugin.configs, {
  flatConfig,
})

export default plugin
