import type { LvConfigOptions, LvRestOptions } from './types'
import antfu, { ensurePackages, interopDefault } from '@antfu/eslint-config'
import { flatConfig } from '@lvjiaxuan/eslint-plugin'
import { resolveConfigs } from './respect-js-options'

export default lv

export function lv(options?: LvConfigOptions, ...restOptions: LvRestOptions[]): ReturnType<typeof antfu> {
  const pipeline = antfu(options, ...restOptions)

  pipeline.append(flatConfig)

  if (options?.oxlint) {
    pipeline.append((async () => {
      await ensurePackages(['eslint-plugin-oxlint'])
      const oxlintPlugin = await interopDefault(import('eslint-plugin-oxlint'))

      return oxlintPlugin.configs['flat/recommended']
    })())
  }

  pipeline.onResolved(configs => ([
    ...configs,
    resolveConfigs(configs),
  ]))

  return pipeline
}
