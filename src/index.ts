import { join } from 'node:path'
import process from 'node:process'
import antfu, { GLOB_SRC } from '@antfu/eslint-config'
import pluginLv from '@lvjiaxuan/eslint-plugin'
import type { FlatConfigItem } from '@antfu/eslint-config'
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
  const defaultFile = 'tsconfig.json'
  if (await pathExists(join(process.cwd(), defaultFile)))
    return defaultFile
}

const lv: typeof antfu = (...args) => {
  return antfu(
    ...args,
    pluginItem,
  )
}

export default lv
