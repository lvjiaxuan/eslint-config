import type { MergeInsertions, UnionToIntersection } from '@type-challenges/utils'
import type categoryRules from './../category-rules.json'

export type CategoryRules<Rules extends typeof categoryRules = typeof categoryRules> = MergeInsertions<{
  [K in keyof Rules]: {
    [KK in keyof Rules[K]]: 'off'
  }
}>

export type Categories = keyof typeof categoryRules

export type OXLintRules = MergeInsertions<UnionToIntersection<CategoryRules[Categories]>>

/**
 * References https://oxc-project.github.io/docs/guide/usage/linter.html#useful-options-and-examples
 */
export type OXLintOptions = {

  /**
   * Deny the rule or category.
   *
   * @default 'correctness'
   */
  deny?: 'all' | Categories | Categories[]

  /**
   * Allow the rule or category.
   */
  allow?: (keyof OXLintRules)[]
} | boolean
