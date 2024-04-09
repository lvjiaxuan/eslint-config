import antfu, { ensurePackages, typescript } from '@antfu/eslint-config'
import type { OptionsTypeScriptParserOptions, OptionsTypeScriptWithTypes } from '@antfu/eslint-config'
import { lvPlugin } from '@lvjiaxuan/eslint-plugin'
import type { OXLintOptions } from '@lvjiaxuan/eslint-plugin-oxlint'
import { detectTsconfigPaths } from './tsconfigs'

type Antfu = typeof antfu
type AntfuParams<Params extends Parameters<Antfu> = Parameters<Antfu>> = [ options?: Params[0] & { oxlint: OXLintOptions }, ...userConfigs: Params[1][] ]
type AntfuReturnType = ReturnType<Antfu>

const lv: (...args: AntfuParams) => AntfuReturnType = (...args) => {
  let pipeline = antfu(...args)

  pipeline = pipeline.append(
    lvPlugin(),
  )

  const [antfuOptions] = args
  if (antfuOptions?.oxlint) {
    pipeline = pipeline.append((async () => {
      await ensurePackages(['@lvjiaxuan/eslint-plugin-oxlint'])
      const { oxlint } = await import('@lvjiaxuan/eslint-plugin-oxlint')
      return oxlint(antfuOptions.oxlint)
    })())
  }

  void pipeline.onResolved(async (configs) => {
    // The name comes from https://github.com/antfu/eslint-config/blob/main/src/configs/typescript.ts .
    if (configs.findIndex(item => item.name === 'antfu/typescript/setup') > -1) {
      let tsOptions = antfuOptions!.typescript as OptionsTypeScriptWithTypes & OptionsTypeScriptParserOptions

      let isUseDetected = false
      if (typeof tsOptions === 'object') {
        if (tsOptions.notDetectTsconfig === true) {
          // Do nothing.
        }
        else if (!Object.hasOwn(tsOptions, 'tsconfigPath')) {
          // Add detected `tsconfigPath` if no-set.
          const paths = await detectTsconfigPaths()
          if (paths.length) {
            tsOptions.tsconfigPath = paths
            isUseDetected = true
          }
        }

        // Use settings.

        tsOptions.parserOptions ??= {}
        tsOptions.parserOptions = {
          warnOnUnsupportedTypeScriptVersion: true,
          EXPERIMENTAL_useProjectService: true,
          ...tsOptions.parserOptions,
        }
      }
      else {
        const paths = await detectTsconfigPaths()
        if (paths.length) {
          // typescript = true means {}
          tsOptions = {
            tsconfigPath: paths,
            parserOptions: {
              warnOnUnsupportedTypeScriptVersion: true,
              EXPERIMENTAL_useProjectService: true,
            },
          }
          isUseDetected = true
        }
      }

      if (isUseDetected) {
        // New ts flat config items with detected `tsconfigPath`.
        const flatConfigItemsWithTsConfig = await typescript(tsOptions as OptionsTypeScriptWithTypes)

        const parserItemIdx = configs.findIndex(item => item.name === 'antfu/typescript/parser')
        configs.splice(
          parserItemIdx,
          1,
          flatConfigItemsWithTsConfig.find(item => item.name === 'antfu/typescript/type-aware-parser')!,
          flatConfigItemsWithTsConfig.find(item => item.name === 'antfu/typescript/parser')!,
        )

        const rulesItemIdx = configs.findIndex(item => item.name = 'antfu/typescript/rules')
        configs.splice(
          rulesItemIdx + 1,
          0,
          flatConfigItemsWithTsConfig.find(item => item.name === 'antfu/typescript/rules-type-aware')!,
        )
      }
    }
  })

  return pipeline
}

export default lv
