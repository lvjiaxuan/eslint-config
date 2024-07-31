import * as rulesCategory from 'eslint-plugin-oxlint/rules-by-category'
import * as rulesScope from 'eslint-plugin-oxlint/rules-by-scope'
import type { Rules, TypedFlatConfigItem } from '@antfu/eslint-config'
import type { AntfuReturnType, OXLintOptions, RuleType } from '.'

export function oxlint(options: OXLintOptions | undefined, pipeline: AntfuReturnType): TypedFlatConfigItem {
  if (!options)
    return {}

  if (typeof options === 'boolean')
    options = { deny: options ? ['recommended'] : [] }
  else if (!Array.isArray(options.deny))
    options = { deny: [options.deny] }

  type rulesByXType = { [K in keyof (typeof rulesCategory & typeof rulesScope)]: Partial<Rules> }
  const rulesByX = { ...rulesCategory, ...rulesScope } as rulesByXType

  // @ts-expect-error Property '_renames' is private and only accessible within class 'FlatConfigComposer<T, ConfigNames>'.ts(2341)
  const renames = pipeline._renames as Record<string, string>

  for (const xKey in rulesByX) {
    const typeXKey = xKey as keyof typeof rulesByX
    const xRules = rulesByX[typeXKey]

    const rulesRenamed = Object.keys(xRules).map((i) => {
      return i.replace(/(.+?)\/(.+)/g, (_match, pluginPrefix: string, ruleName: string) => {
        if (pluginPrefix in renames)
          return `${renames[pluginPrefix]}/${ruleName}`

        return _match
      })
    }) as (keyof Rules)[]

    rulesByX[typeXKey] = rulesRenamed.reduce((acc, item) => {
      acc[item] = 'off'
      return acc
    }, {} as Record<keyof Rules, 'off'>)
  }

  const denyRules = options.deny.includes('all')
    ? rulesByX
    : (options.deny as RuleType[]).reduce((acc, item) => {
        const typeType = (item === 'recommended' ? 'correctnessRules' : `${item}Rules`) as keyof typeof rulesByX
        acc = { ...acc, ...rulesByX[typeType] }
        return acc
      }, {} as typeof rulesByX)

  return {
    name: 'oxlint/disables/rules',
    rules: denyRules as Partial<Rules>,
  }
}
