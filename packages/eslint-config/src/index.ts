import antfu, { ensurePackages, typescript } from '@antfu/eslint-config'
import type { FlatConfigItem, OptionsTypeScriptParserOptions, OptionsTypeScriptWithTypes } from '@antfu/eslint-config'
import { lvPlugin } from '@lvjiaxuan/eslint-plugin'
import type { OptionsOXLint } from '@lvjiaxuan/eslint-plugin-oxlint'
import { detectTsconfigPaths } from './tsconfigs'

type Antfu = typeof antfu
type _Params<Params extends Parameters<Antfu> = Parameters<Antfu>> = [ options?: Params[0] & { oxlint: OptionsOXLint }, ...userConfigs: Params[1][] ]

const lv: (...args: _Params) => ReturnType<Antfu> = async (...args) => {
  const [options] = args

  const pluginsInstalled = [lvPlugin()]

  if (options?.oxlint) {
    await ensurePackages(['@lvjiaxuan/eslint-plugin-oxlint'])
    const { oxlint } = await import('@lvjiaxuan/eslint-plugin-oxlint')
    pluginsInstalled.push(...(await oxlint(options.oxlint)))
  }

  const merged = await antfu(
    ...args,
    ...pluginsInstalled,
  ) as FlatConfigItem[]

  if (merged.find(item => item.name === 'antfu:typescript:setup')) {
    // Means ts is setup.
    let tsOptions = args[0]?.typescript as OptionsTypeScriptWithTypes & OptionsTypeScriptParserOptions

    let isUseDetected = false
    if (typeof tsOptions === 'object') {
      if ('notDetectTsconfig' in tsOptions && tsOptions.notDetectTsconfig === true) {
        // Do nothing.
      }
      else if (!Object.hasOwn(tsOptions, 'tsconfigPath')) {
        // Overwrite with detected `tsconfigPath` if no-set.
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
      // New ts flat config with detected `tsconfigPath`.
      const tsItemsWithTsConfig = await typescript(tsOptions as OptionsTypeScriptWithTypes)

      const parserItemName = 'antfu:typescript:parser'
      const originParserItemIdx = merged.findIndex(item => item.name === parserItemName)
      merged.splice(originParserItemIdx, 1, tsItemsWithTsConfig.find(item => item.name === parserItemName)!)

      const typeAwareParserItemName = 'antfu:typescript:type-aware-parser'
      merged.splice(originParserItemIdx + 1, 0, tsItemsWithTsConfig.find(item => item.name === typeAwareParserItemName)!)

      const typeAwareItemName = 'antfu:typescript:rules-type-aware'
      const tsTypeAwareItemIdx = merged.findIndex(item => item.name === typeAwareItemName)
      merged.splice(tsTypeAwareItemIdx, 1, tsItemsWithTsConfig.find(item => item.name === typeAwareItemName)!)
    }
  }

  return merged
}

export default lv
