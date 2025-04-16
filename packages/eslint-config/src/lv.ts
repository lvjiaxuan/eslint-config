import type { LvParams } from '.'
import antfu from '@antfu/eslint-config'
import { lvPlugin } from '@lvjiaxuan/eslint-plugin'
import { oxlint, respectJsRuleOptions } from '.'

export default lv

export async function lv(...args: LvParams) {
  const [afOptionsConfig] = args
  const pipeline = antfu(...args)

  return pipeline
    .append(lvPlugin())
    .append(oxlint(afOptionsConfig?.oxlint, pipeline))
    .append(respectJsRuleOptions(await pipeline.toConfigs()))
}
