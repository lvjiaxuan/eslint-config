import fs from 'node:fs/promises'
import { pluginsToRulesDTS } from 'eslint-typegen/core'
import plugin from '../src/index'

const dts = await pluginsToRulesDTS({
  lvjiaxuan: plugin,
})

await fs.writeFile(new URL('../src/typegen.d.ts', import.meta.url), dts)
