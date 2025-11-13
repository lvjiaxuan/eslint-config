import type { TypedFlatConfigItem } from '@antfu/eslint-config'
import type { TSESLint } from '@typescript-eslint/utils'
import type { ESLint, Rule } from 'eslint'
import { version } from '../package.json'
import preferGenericRestExtends from './prefer-generic-rest-extends'

export type { RuleOptions } from './typegen'

const pluginName = 'lvjiaxuan' as const

const pluginRules = {
  'prefer-generic-rest-extends': preferGenericRestExtends as unknown as Rule.RuleModule,
}

const rulesSetting = {
  [`${pluginName}/prefer-generic-rest-extends`]: 'warn' as TSESLint.Linter.RuleEntry,
} as const

const plugin = {
  meta: {
    name: `@${pluginName}/plugin` as const,
    version,
  },
  rules: pluginRules,
  configs: {
    recommended: {
      plugins: [pluginName],
      rules: rulesSetting,
    },
    // 'flat/recommended': flatConfig,
  },
} satisfies ESLint.Plugin

const flatConfig = {
  name: `${pluginName}/plugin` as const,
  plugins: {
    [pluginName]: plugin, // as unknown as ESLint.Plugin,
  },
  rules: rulesSetting,
} satisfies TypedFlatConfigItem

export default plugin

export { flatConfig, plugin }
