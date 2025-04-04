import type { antfu, OptionsConfig, TypedFlatConfigItem } from '@antfu/eslint-config'
import type * as rulesCategory from 'eslint-plugin-oxlint/rules-by-category'
import type * as rulesScope from 'eslint-plugin-oxlint/rules-by-scope'

export type OXLintConfigsName = 'recommended' | 'all' | ((keyof typeof rulesCategory | keyof typeof rulesScope) extends `${infer F extends string}Rules` ? F : never)

/**
 * Reference to https://github.com/oxc-project/eslint-plugin-oxlint#all-configs
 * Set `true` is equal to `{ deny: 'recommended' }`.
 *
 * @default false
 */
export type OXLintOptions = boolean | { deny: OXLintConfigsName | OXLintConfigsName[] }

export type Antfu = typeof antfu

export type OverrideOptionsConfig = Omit<OptionsConfig, 'typescript'> & { oxlint?: OXLintOptions }
export type OverrideAntfuParams<Params extends Parameters<Antfu> = Parameters<Antfu>> = [ options?: OverrideOptionsConfig & TypedFlatConfigItem, ...userConfigs: Params[1][] ]

export type AntfuReturnType = ReturnType<Antfu>
