import * as rulesCategory from 'eslint-plugin-oxlint/rules-by-category'
import * as rulesScope from 'eslint-plugin-oxlint/rules-by-scope'
import type { TypedFlatConfigItem } from '@antfu/eslint-config'
import type { OXLintOptions, RuleType } from '.'

export function oxlint(options: OXLintOptions = true): TypedFlatConfigItem {
  if (typeof options === 'boolean')
    options = { deny: options ? ['recommended'] : [] }
  else if (!Array.isArray(options.deny))
    options = { deny: [options.deny] }

  const allRules = { ...rulesCategory, ...rulesScope } as typeof rulesCategory & typeof rulesScope
  const denyRules = options.deny.includes('all')
    ? allRules
    : (options.deny as RuleType[]).reduce((acc, item) => {
        const typeType = (item === 'recommended' ? 'correctnessRules' : `${item}Rules`) as keyof typeof allRules
        acc = { ...acc, ...allRules[typeType] }
        return acc
      }, {} as typeof allRules)

  return {
    name: 'oxlint/rules',
    // @ts-expect-error non-antfu's rules.
    rules: denyRules,
  }
}
