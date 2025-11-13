import type antfu from '@antfu/eslint-config'
import type { RuleOptions } from '@lvjiaxuan/eslint-plugin'

export type AntfuParams = Parameters<typeof antfu>

export interface Rules { rules: NonNullable<AntfuParams[0]>['rules'] & RuleOptions }

export type LvOptions = AntfuParams[0] & {
  oxlint?: boolean
}

export type LvConfigOptions = LvOptions & Rules

export type LvRestOptions = AntfuParams[1] & Rules
