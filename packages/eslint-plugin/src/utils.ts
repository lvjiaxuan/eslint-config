import type { RuleContext, RuleMetaData } from '@typescript-eslint/utils/ts-eslint'
import { ESLintUtils } from '@typescript-eslint/utils'

// type RuleContextWithoutDeprecated = Omit<RuleContext, 'getSourceCode' | 'getAncestors' | 'getDeclaredVariables' | 'markVariableAsUsed' | 'reportExtraRange'>

/** https://typescript-eslint.io/developers/eslint-plugins#rulecreator-usage */
export interface MorePluginDocs {
  recommended?: boolean
  requiresTypeChecking?: boolean
}

const RuleCreator = ESLintUtils.RuleCreator<MorePluginDocs>(
  ruleName => `https://github.com/lvjiaxuan/eslint-config/blob/main/packages/eslint-plugin/src/${ruleName}.md`,
)

type P = Parameters<typeof RuleCreator>[0]

type TSContext = Parameters<P['create']>[0]

type Deprecated = 'parserOptions' | 'parserPath' | 'parserServices' | 'getAncestors' | 'getDeclaredVariables' | 'getCwd' | 'getFilename' | 'getPhysicalFilename' | 'getScope' | 'getSourceCode' | 'markVariableAsUsed'

export function createRule(options: Omit<P, 'create'> & {
  create: (context: Omit<TSContext, Deprecated>) => ReturnType<P['create']>
  meta: Omit<RuleMetaData, 'defaultOptions'>
}) {
  return RuleCreator(options)
}
