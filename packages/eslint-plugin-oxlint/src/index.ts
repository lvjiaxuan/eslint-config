import type { FlatESLintConfigItem, RuleLevel } from '@antfu/eslint-define-config'
import _rules from './../category-rules.json'

type _UnionToIntersection<U> = (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void ? I : never

const rules = _rules as CategoryRules
type CategoryRules<Rules extends typeof _rules = typeof _rules> = {
  [K in keyof Rules]: {
    [KK in keyof Rules[K]]: RuleLevel
  }
}

type Category = keyof typeof _rules

export type OXLintRules = _UnionToIntersection<CategoryRules[Category]>

export type OptionsOXLint = {
  deny?: Category | 'all'
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
    options = { deny: 'Correctness' }
  }
  else {
    return [{
      name: 'lvjixuan:eslint-oxlint',
      rules: {},
    }]
  }

  let category: Partial<OXLintRules> = {}

  if (options.deny === 'all') {
    for (const c in rules)
      category = { ...category, ...rules[c as Category] }
  }
  else if (options.deny) {
    category = rules[options.deny]
  }

  return [{
    name: 'lvjixuan:eslint-oxlint',
    rules: category,
  }]
}
