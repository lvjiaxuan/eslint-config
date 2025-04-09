import type { TypedFlatConfigItem } from '@antfu/eslint-config'

/**
 * When I created this function, there were indeed several TypeScript rule options that did not respect the JavaScript rule options.
 * But today(2025/4/9) I found that they are gone and none one for now, so let's keep it for now.
 */
export function respectJsRuleOptions(configs: TypedFlatConfigItem[]) {
  const tsConfig = configs.find(i => i.name === 'antfu/typescript/rules')!
  const jsConfig = configs.find(i => i.name === 'antfu/javascript/rules')!

  const overrideFCItem4ts: TypedFlatConfigItem = { name: 'lvjiaxuan/respectjs4ts/rules', files: tsConfig.files, rules: {} }

  Object.keys(tsConfig.rules!).forEach((name) => {
    const [pluginName, ruleName] = name.split('/')

    if (pluginName !== 'ts' || !ruleName)
      return

    const tsRuleOptions = tsConfig.rules![name]
    if ((Array.isArray(tsRuleOptions) && tsRuleOptions.length === 2) || tsRuleOptions === 'off')
      return

    const tsRule2js = tsConfig.rules![ruleName]
    if (tsRule2js !== 'off')
      return

    const jsRuleOptions = jsConfig.rules![ruleName]
    if (!jsRuleOptions || !Array.isArray(jsRuleOptions) || (Array.isArray(jsRuleOptions) && jsRuleOptions.length === 1))
      return

    let jsRuleSeverity = Array.isArray(jsRuleOptions) ? jsRuleOptions[0] : jsRuleOptions
    jsRuleSeverity === 1 && (jsRuleSeverity = 'warn')
    jsRuleSeverity === 2 && (jsRuleSeverity = 'error')

    const tsRuleSeverity = Array.isArray(tsRuleOptions) ? tsRuleOptions[0] : tsRuleOptions
    if (jsRuleSeverity !== tsRuleSeverity)
      return

    overrideFCItem4ts.rules![name] = [jsRuleSeverity, jsRuleOptions[1]]
  })

  return overrideFCItem4ts
}
