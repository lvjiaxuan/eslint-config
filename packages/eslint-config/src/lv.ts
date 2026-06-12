import antfu, { ensurePackages, interopDefault } from '@antfu/eslint-config'
import lvPlugin from '@lvjiaxuan/eslint-plugin'

export type LvOptions = Parameters<typeof antfu>[0] & {
  oxlint?: boolean
}

export default lv

export function lv(options?: LvOptions): ReturnType<typeof antfu> {
  const pipeline = antfu(options)

  pipeline.append(lvPlugin.configs['flat/recommended'])

  if (options?.oxlint) {
    pipeline.append((async () => {
      await ensurePackages(['eslint-plugin-oxlint'])
      const oxlintPlugin = await interopDefault(import('eslint-plugin-oxlint'))

      return oxlintPlugin.configs['flat/recommended']
    })())
  }

  return pipeline
}
