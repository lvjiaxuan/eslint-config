import { ESLintUtils } from '@typescript-eslint/utils'

/** https://typescript-eslint.io/developers/eslint-plugins#rulecreator-usage */
export interface MorePluginDocs {
  recommended?: boolean
  requiresTypeChecking?: boolean
}

const RuleCreator = ESLintUtils.RuleCreator<MorePluginDocs>(
  ruleName => `https://github.com/lvjiaxuan/eslint-config/blob/main/packages/eslint-plugin/src/${ruleName}.md`,
)

// type RuleCreatorParams = Parameters<typeof RuleCreator>[0]

// type TSContext = Parameters<RuleCreatorParams['create']>[0]

// type Deprecated =
//   | 'parserOptions'
//   | 'parserPath'
//   | 'parserServices'
//   | 'getAncestors'
//   | 'getDeclaredVariables'
//   | 'getCwd'
//   | 'getFilename'
//   | 'getPhysicalFilename'
//   | 'getScope'
//   | 'getSourceCode'
//   | 'markVariableAsUsed'

// export function createRule(options: Omit<RuleCreatorParams, 'create' | 'meta'> & {
//   create: (context: Omit<TSContext, Deprecated>) => ReturnType<RuleCreatorParams['create']>
//   meta: Omit<RuleCreatorParams['meta'], 'defaultOptions'>
// }) {
//   return RuleCreator(options)
// }

export const createRule = RuleCreator
