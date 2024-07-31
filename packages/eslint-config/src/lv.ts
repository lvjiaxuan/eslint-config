import antfu from '@antfu/eslint-config'
import { lvPlugin } from '@lvjiaxuan/eslint-plugin'
import { type OverrideAntfuParams, oxlint } from '.'

export default lv

export async function lv(...args: OverrideAntfuParams) {
  const [afOptionsConfig] = args
  let pipeline = antfu(...args)

  pipeline = pipeline.append(lvPlugin())

  pipeline = pipeline.append(oxlint(afOptionsConfig?.oxlint, pipeline))

  return pipeline
}
