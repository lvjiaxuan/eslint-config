import type { RuleLevel } from '@antfu/eslint-define-config'
import type { TypedFlatConfigItem } from '@antfu/eslint-config'
import type { MergeInsertions, UnionToIntersection } from '@type-challenges/utils'
import categoryRules from './../category-rules.json'

type CategoryRules<Rules extends typeof categoryRules = typeof categoryRules> = MergeInsertions<{
  [K in keyof Rules]: {
    [KK in keyof Rules[K]]: RuleLevel
  }
}>

type Categories = keyof typeof categoryRules

const rules = categoryRules as CategoryRules

export type OXLintRules = MergeInsertions<UnionToIntersection<CategoryRules[Categories]>>

export type OXLintOptions = {
  deny?: Categories | 'all'
  allow?: (keyof OXLintRules)[]
  // TODO plugins
} | boolean

export function oxlint(options: OXLintOptions = true): TypedFlatConfigItem[] {
  if (options === true)
    options = { deny: 'correctness' }
  else if (options === false)
    return []

  let denyRules: Partial<OXLintRules> = {}

  if (options.deny === 'all') {
    for (const c in rules)
      denyRules = { ...denyRules, ...rules[c as Categories] }
  }
  else if (options.deny) {
    denyRules = rules[options.deny]
  }

  return [{
    name: 'lvjixuan/plugin/oxlint',
    rules: denyRules,
  }]
}

// The legacy config.
export default {
  configs: {
    // categories classification
    ...Object.entries(categoryRules).reduce((acc, [c, r]) => {
      acc[c as Categories] = { rules: r as CategoryRules[Categories] }
      return acc
    }, {} as Record<Categories, { rules: CategoryRules[Categories] }>),
    // plugins classification
  },
}
