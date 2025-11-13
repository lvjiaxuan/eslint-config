import type { TypedFlatConfigItem } from '@antfu/eslint-config'

const severityMap = { 0: 'off', 1: 'warn', 2: 'error' } as const

function normalizeSeverity(severity: unknown): string {
  if (typeof severity === 'number' && severity in severityMap)
    return severityMap[severity as 0 | 1 | 2]
  return severity as string
}

/**
 * Creates a flat config that syncs TS rule options from their JS counterparts.
 * Originally there were rules that needed this, but as of 2025/4/9 none do. Keeping it around just in case.
 */
export function resolveConfigs(configs: TypedFlatConfigItem[]) {
  const tsConfig = configs.find(i => i.name === 'antfu/typescript/rules')!
  const jsConfig = configs.find(i => i.name === 'antfu/javascript/rules')!

  const tsOverride: TypedFlatConfigItem = { name: 'lvjiaxuan/respect-js-options/rules', files: tsConfig.files, rules: {} }

  for (const name of Object.keys(tsConfig.rules!)) {
    const [pluginName, ruleName] = name.split('/')
    if (pluginName !== 'ts' || !ruleName)
      continue

    const tsRuleOptions = tsConfig.rules![name]
    if (tsRuleOptions === 'off' || (Array.isArray(tsRuleOptions) && tsRuleOptions.length >= 2))
      continue

    if (tsConfig.rules![ruleName] !== 'off')
      continue

    const jsRuleOptions = jsConfig.rules![ruleName]
    if (!Array.isArray(jsRuleOptions) || jsRuleOptions.length <= 1)
      continue

    const jsSeverity = normalizeSeverity(jsRuleOptions[0])
    const tsSeverity = normalizeSeverity(Array.isArray(tsRuleOptions) ? tsRuleOptions[0] : tsRuleOptions)

    if (jsSeverity !== tsSeverity)
      continue

    tsOverride.rules![name] = [jsSeverity as any, jsRuleOptions[1]]
  }

  return tsOverride
}
