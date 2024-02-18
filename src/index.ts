import { join } from 'node:path'
import process from 'node:process'
import antfu, { ensurePackages, typescript } from '@antfu/eslint-config'
import type { FlatConfigItem, OptionsTypeScriptWithTypes } from '@antfu/eslint-config'
import { lvPlugin } from '@lvjiaxuan/eslint-plugin'
import { pathExists } from 'fs-extra'
import type { OptionsOXLint } from '@lvjiaxuan/eslint-plugin-oxlint'

async function detectTsconfigPath() {
  const defaultFile = 'tsconfig.json' as const
  if (await pathExists(join(process.cwd(), defaultFile)))
    return defaultFile
}

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
    let tsOptions = args[0]?.typescript

    let isUseDetect = false
    if (typeof tsOptions === 'object') {
      if ('notDetectTsconfig' in tsOptions && tsOptions.notDetectTsconfig === true) {
        // Do nothing.
      }
      else if (!Object.hasOwn(tsOptions, 'tsconfigPath')) {
        // Overwrite with detected `tsconfigPath` if no-set.
        (tsOptions as OptionsTypeScriptWithTypes).tsconfigPath = await detectTsconfigPath()
        isUseDetect = true
      }

      // Use settings.
    }
    else {
      // @ts-expect-error typescript = true means {} .
      ;(tsOptions as OptionsTypeScriptWithTypes) = { tsconfigPath: await detectTsconfigPath() }
      isUseDetect = true
    }

    if (isUseDetect) {
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
