import type { OverrideAntfuParams } from '.'
import antfu from '@antfu/eslint-config'
import { lvPlugin } from '@lvjiaxuan/eslint-plugin'
import { oxlint, respectJsRuleOptions } from '.'

export default lv

export async function lv(...args: OverrideAntfuParams) {
  const [afOptionsConfig] = args
  let pipeline = antfu(...args)

  pipeline = pipeline.append(lvPlugin())

  pipeline = pipeline.append(oxlint(afOptionsConfig?.oxlint, pipeline))

  pipeline.onResolved(respectJsRuleOptions)

  return pipeline
}
