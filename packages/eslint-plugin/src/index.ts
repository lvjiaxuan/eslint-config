import type { TypedFlatConfigItem } from '@antfu/eslint-config'
import { TSESLint } from '@typescript-eslint/utils'
import type { ESLint, Rule, Linter } from 'eslint'
import { GLOB_TS, GLOB_TSX } from '@antfu/eslint-config'
import preferGenericRestExtends from './prefer-generic-rest-extends'
import { version } from '../package.json'

const pluginName = 'lvjiaxuan'

// const rules = {
//   [`${pluginName}/prefer-generic-rest-extends`]: preferGenericRestExtends,
// }

const rulesSettings: TSESLint.Linter.RulesRecord = {
  [`${pluginName}/prefer-generic-rest-extends`]: 'warn',
}

const plugin = {
  meta: {
    name: '@lvjiaxuan/eslint-plugin',
    version,
  },
  rules: {
    'prefer-generic-rest-extends': preferGenericRestExtends,
  },
  configs: {
    'recommended': {
      plugins: [pluginName],
      rules: rulesSettings,
    },
  },
} satisfies TSESLint.Linter.Plugin // ESLint.Plugin

const flatConfig: TypedFlatConfigItem = {
  name: 'lvjiaxuan/plugin/do-all',

  plugins: {
    [pluginName]: plugin
  },

  rules: rulesSettings,
}

export default plugin
