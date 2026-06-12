import type { TypedFlatConfigItem } from '@antfu/eslint-config'
import type { TSESLint } from '@typescript-eslint/utils'
import type { ESLint, Rule } from 'eslint'
import { version } from '../package.json'
import preferGenericRestExtends from './prefer-generic-rest-extends'

const pluginName = 'lvjiaxuan'

const pluginRules = {
  'prefer-generic-rest-extends': preferGenericRestExtends, // as unknown as Rule.RuleModule,
}

const rulesConfig: TSESLint.Linter.RulesRecord = {
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
      rules: rulesConfig,
    },
    'flat/recommended': {} as TypedFlatConfigItem,
  },
// } satisfies TSESLint.Linter.Plugin
} satisfies ESLint.Plugin

const flatConfig: TypedFlatConfigItem = {
  name: 'lvjiaxuan/plugin',

  plugins: {
    [pluginName]: plugin,
  },

  rules: rulesConfig,
}

plugin.configs['flat/recommended'] = flatConfig

export default plugin

export { flatConfig, plugin }
