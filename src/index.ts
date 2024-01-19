import { join } from 'node:path'
import process from 'node:process'
import antfu, { GLOB_SRC, typescript } from '@antfu/eslint-config'
import type { FlatConfigItem, OptionsTypeScriptWithTypes } from '@antfu/eslint-config'
import pluginLv from '@lvjiaxuan/eslint-plugin'
import { pathExists } from 'fs-extra'

const pluginItem: FlatConfigItem = {
  files: [GLOB_SRC],
  name: '@lvjiaxuan:plugin:setup',
  plugins: {
    '@lvjiaxuan': pluginLv,
  },
  rules: {
    '@lvjiaxuan/prefer-generic-rest-extends': 'warn',
  },
}

async function detectTsconfigPath() {
  const defaultFile = 'tsconfig.json' as const
  if (await pathExists(join(process.cwd(), defaultFile)))
    return defaultFile
}

const lv: typeof antfu = async (...args) => {
  const merged = await antfu(
    ...args,
    pluginItem,
  ) as FlatConfigItem[]

  if (merged.find(item => item.name === 'antfu:typescript:setup')) {
    // Means ts is setup.
    let tsOptions = args[0]?.typescript

    let isUseDetect = false
    // Overwrite with detected `tsconfigPath` if no-set.
    if (typeof tsOptions === 'object') {
      if (!Object.hasOwn(tsOptions, 'tsconfigPath')) {
        (tsOptions as OptionsTypeScriptWithTypes).tsconfigPath = await detectTsconfigPath()
        isUseDetect = true
      }
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
