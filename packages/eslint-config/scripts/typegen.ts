import fs from 'node:fs/promises'

import { flatConfigsToRulesDTS } from 'eslint-typegen/core'
import { builtinRules } from 'eslint/use-at-your-own-risk'
import antfu, { CONFIG_PRESET_FULL_ON } from '@antfu/eslint-config'

const configs = await antfu(CONFIG_PRESET_FULL_ON)
  .prepend({
    plugins: {
      '': {
        rules: Object.fromEntries(builtinRules.entries()),
      },
    },
  })

const configNames = configs.map(i => i.name).filter(Boolean) as string[]

let dts = await flatConfigsToRulesDTS(configs, {
  includeAugmentation: false,
})

dts += `
// Names of all the configs
export type ConfigNames = ${configNames.map(i => `'${i}'`).join(' | ')}
`

await fs.writeFile(new URL('../src/typegen.d.ts', import.meta.url), dts)
