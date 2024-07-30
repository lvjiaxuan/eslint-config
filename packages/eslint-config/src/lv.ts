import antfu from '@antfu/eslint-config'
import { lvPlugin } from '@lvjiaxuan/eslint-plugin'
import { type OverrideAntfuParams, oxlint, tsconfigs } from '.'


export async function lv(...args: OverrideAntfuParams) {
  let pipeline = antfu(...args)
  pipeline = pipeline.append(
    lvPlugin(),
  )

  const [antfuOption] = args
  if (antfuOption?.oxlint === true && typeof antfuOption?.oxlint === 'object') {
    pipeline = pipeline.append(
      oxlint(antfuOption.oxlint),
    )
  }

  void pipeline.onResolved(async (configs) => {
    await tsconfigs(configs, antfuOption)
  })

  return pipeline
}

export default lv
