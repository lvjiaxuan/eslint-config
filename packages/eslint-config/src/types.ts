import antfu from '@antfu/eslint-config'

export type OXLintOptions = {}

export type Antfu = typeof antfu
export type AntfuParams<Params extends Parameters<Antfu> = Parameters<Antfu>> = [ options?: Params[0] & { oxlint: OXLintOptions }, ...userConfigs: Params[1][] ]
export type AntfuReturnType = ReturnType<Antfu>