import type { FlatESLintConfigItem, RuleLevel } from '@antfu/eslint-define-config'
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

export type OptionsOXLint = {
  deny?: Categories | 'all'
  allow?: (keyof OXLintRules)[]
  // plugins: TODO
} | boolean

// https://github.com/antfu/eslint-config/blob/3707078921b8d246b1d2980c5c4cfe7f39c67699/src/types.ts#L59
type FlatConfigItem = Omit<FlatESLintConfigItem<OXLintRules, false>, 'plugins'> & {
  /**
   * Custom name of each config item
   */
  name?: string
  /**
   * An object containing a name-value mapping of plugin names to plugin objects. When `files` is specified, these plugins are only available to the matching files.
   *
   * @see [Using plugins in your configuration](https://eslint.org/docs/latest/user-guide/configuring/configuration-files-new#using-plugins-in-your-configuration)
   */
  plugins?: Record<string, any>
}

export async function oxlint(options: OptionsOXLint = true): Promise<FlatConfigItem[]> {
  if (options === true) {
    options = { deny: 'correctness' }
  }
  else {
    return [{
      name: 'lvjixuan:eslint-oxlint',
      rules: {},
    }]
  }

  let denyRules: Partial<OXLintRules> = {}

  if (options.deny === 'all') {
    for (const c in rules)
      denyRules = { ...denyRules, ...rules[c as Categories] }
  }
  else if (options.deny) {
    denyRules = rules[options.deny]
  }

  return [{
    name: 'lvjixuan:eslint-oxlint',
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
