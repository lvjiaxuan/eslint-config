import type { TypedFlatConfigItem } from '@antfu/eslint-config'

export function respectJsRuleOptions(configs: TypedFlatConfigItem[]) {
  const tsConfig = configs.find(i => i.name === 'antfu/typescript/rules')!
  const jsConfig = configs.find(i => i.name === 'antfu/javascript/rules')!

  Object.keys(tsConfig.rules!).forEach((name) => {
    const parts = name.split('/')

    if (parts[0] !== 'ts')
      return

    const tsRule = tsConfig.rules![name]
    if ((Array.isArray(tsRule) && tsRule.length === 2) || tsRule === 'off')
      return

    const tsRule2js = tsConfig.rules![parts[1]]
    if (tsRule2js !== 'off')
      return

    const jsRule = jsConfig.rules![parts[1]]
    if (!jsRule || !Array.isArray(jsRule) || (Array.isArray(jsRule) && jsRule.length === 1))
      return

    let jsRuleSeverity = Array.isArray(jsRule) ? jsRule[0] : jsRule
    jsRuleSeverity === 1 && (jsRuleSeverity = 'warn')
    jsRuleSeverity === 2 && (jsRuleSeverity = 'error')

    const tsRuleSeverity = Array.isArray(tsRule) ? tsRule[0] : tsRule
    if (jsRuleSeverity !== tsRuleSeverity)
      return

    tsConfig.rules![name] = [jsRuleSeverity, jsRule[1]]
  })

  return configs
}
