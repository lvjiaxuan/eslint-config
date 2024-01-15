import { join } from 'node:path'
import process from 'node:process'
import antfu, { GLOB_SRC, typescript } from '@antfu/eslint-config'
import type { FlatConfigItem, OptionsTypeScriptWithTypes } from '@antfu/eslint-config'
import pluginLv from '@lvjiaxuan/eslint-plugin'
import { pathExists } from 'fs-extra'

const pluginItem: FlatConfigItem = {
  files: [GLOB_SRC],
  name: '@lvjiaxuan:plugin',
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
    // Means ts is setup
    let tsOptions = args[0]?.typescript

    // Overwrite with tsconfigPath
    if (typeof tsOptions === 'object') {
      (tsOptions as OptionsTypeScriptWithTypes).tsconfigPath ??= await detectTsconfigPath()
    }
    else {
      // @ts-expect-errord typescript = true means {}
      ;(tsOptions as OptionsTypeScriptWithTypes) = { tsconfigPath: await detectTsconfigPath() }
    }

    // New ts options with `tsconfigPath`.
    const tsItems = await typescript(tsOptions as OptionsTypeScriptWithTypes)

    const tsRulesItemName = 'antfu:typescript:rules'
    const tsRulesItemIdx = merged.findIndex(item => item.name === tsRulesItemName)
    merged.splice(tsRulesItemIdx, 1, tsItems.find(item => item.name === tsRulesItemName)!)

    const tsTypeAwareItemName = 'antfu:typescript:rules-type-aware'
    const tsTypeAwareItemIdx = merged.findIndex(item => item.name === tsTypeAwareItemName)
    merged.splice(tsTypeAwareItemIdx, 1, tsItems.find(item => item.name === tsTypeAwareItemName)!)
  }

  return merged
}

export default lv
