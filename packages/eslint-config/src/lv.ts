import antfu, { ensurePackages, typescript } from '@antfu/eslint-config'
import type { OptionsTypeScriptWithTypes } from '@antfu/eslint-config'
import { lvPlugin } from '@lvjiaxuan/eslint-plugin'
import { tsconfigs, type AntfuParams, type AntfuReturnType } from '.'

export const lv: (...args: AntfuParams) => AntfuReturnType = (...args) => {
  let pipeline = antfu(...args)

  pipeline = pipeline.append(
    lvPlugin(),
  )

  const [antfuOption] = args

  void pipeline.onResolved(async (configs) => {
    // The name comes from https://github.com/antfu/eslint-config/blob/main/src/configs/typescript.ts .
    if (configs.findIndex(item => item.name === 'antfu/typescript/setup') > -1) {
      let tsOptions = antfuOption?.typescript

      let isUseDetected = false
      if (typeof tsOptions === 'object') {
        if ('notDetectTsconfig' in tsOptions && tsOptions.notDetectTsconfig === true) {
          // Do nothing.
        }
        else if ('parserOptions' in tsOptions && !tsOptions.parserOptions!.project) {
          // OptionsTypeScriptParserOptions
          const paths = await tsconfigs()
          if (paths.length) {
            tsOptions.parserOptions!.project = paths
            isUseDetected = true
          }
        }
        else if (!(tsOptions as OptionsTypeScriptWithTypes).tsconfigPath) {
          const paths = await tsconfigs()
          if (paths.length) {
            (tsOptions as OptionsTypeScriptWithTypes).tsconfigPath = paths
            isUseDetected = true
          }
        }

        // @ts-expect-error OptionsTypeScriptParserOptions
        tsOptions.parserOptions ??= {}
        // @ts-expect-error OptionsTypeScriptParserOptions
        // eslint-disable-next-line ts/no-unsafe-assignment
        tsOptions.parserOptions = {
          /**
           * @see https://github.com/typescript-eslint/typescript-eslint/issues/2094#issuecomment-1820936720
           */
          warnOnUnsupportedTypeScriptVersion: true,
          EXPERIMENTAL_useProjectService: true,
          // @ts-expect-error OptionsTypeScriptParserOptions
          ...tsOptions.parserOptions,
        }
      }
      else {
        const paths = await tsconfigs()
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

        const rulesItemIdx = configs.findIndex(item => item.name === 'antfu/typescript/rules')
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
