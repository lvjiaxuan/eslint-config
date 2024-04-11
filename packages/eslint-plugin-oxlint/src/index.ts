import type { TypedFlatConfigItem } from '@antfu/eslint-config'
import type { Categories, CategoryRules, OXLintOptions, OXLintRules } from './types'
import categoryRules from './../category-rules.json'

const rules = categoryRules as CategoryRules

export * from './types'

export function oxlint(options: OXLintOptions = true): TypedFlatConfigItem[] {
  if (options === true)
    options = { deny: 'correctness' }
  else if (options === false)
    return []

  let denyRules: Partial<OXLintRules> = {}

  // deny option
  if (options.deny === 'all') {
    for (const c in rules)
      denyRules = { ...denyRules, ...rules[c as Categories] }
  }
  else if (typeof options.deny === 'string') {
    denyRules = rules[options.deny]
  }
  else if (Array.isArray(options.deny)) {
    for (const c of options.deny) {
      if (options.deny.includes(c))
        denyRules = { ...denyRules, ...rules[c] }
    }
  }

  // allow option
  for (const r of options?.allow ?? []) {
    if (denyRules[r])
      delete denyRules[r]
  }

  return [{
    name: 'lvjiaxuan/plugin/oxlint',
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
  },
}
