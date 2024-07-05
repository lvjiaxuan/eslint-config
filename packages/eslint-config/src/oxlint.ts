import * as rulesCategory from 'eslint-plugin-oxlint/rules-by-category'
import * as rulesScope from 'eslint-plugin-oxlint/rules-by-scope'
import type { TypedFlatConfigItem } from '@antfu/eslint-config'
import { defaultPluginRenaming } from '@antfu/eslint-config'
import type { OXLintOptions, RuleType } from '.'

export function oxlint(options: OXLintOptions = true): TypedFlatConfigItem {
  if (typeof options === 'boolean')
    options = { deny: options ? ['recommended'] : [] }
  else if (!Array.isArray(options.deny))
    options = { deny: [options.deny] }

  const rulesByX = { ...rulesCategory, ...rulesScope } as typeof rulesCategory & typeof rulesScope

  for (const xKey in rulesByX) {
    const xRules = rulesByX[xKey as keyof typeof rulesByX]

    const rulesReNamed = Object.keys(xRules).map((i) => {
      return i.replace(/(.+?)\/(.+)/g, (_match, pluginPrefix: string, ruleName: string) => {
        if (pluginPrefix in defaultPluginRenaming)
          return `${defaultPluginRenaming[pluginPrefix as keyof typeof defaultPluginRenaming]}/${ruleName}`

        return _match
      })
    })

    // @ts-expect-error rename
    rulesByX[xKey] = rulesReNamed.reduce((acc, item) => {
      acc[item] = 'off'
      return acc
    }, {} as Record<string, 'off'>)
  }

  const denyRules = options.deny.includes('all')
    ? rulesByX
    : (options.deny as RuleType[]).reduce((acc, item) => {
        const typeType = (item === 'recommended' ? 'correctnessRules' : `${item}Rules`) as keyof typeof rulesByX
        acc = { ...acc, ...rulesByX[typeType] }
        return acc
      }, {} as typeof rulesByX)

  return {
    name: 'oxlint/rules',
    // @ts-expect-error non-antfu's rules.
    rules: denyRules,
  }
}
