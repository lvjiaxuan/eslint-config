import { ESLintUtils } from '@typescript-eslint/utils'

/** https://typescript-eslint.io/developers/eslint-plugins#rulecreator-usage */
export interface MorePluginDocs {
  recommended?: boolean;
  requiresTypeChecking?: boolean;
}

const RuleCreator = ESLintUtils.RuleCreator<MorePluginDocs>(
  ruleName => `https://github.com/lvjiaxuan/eslint-config/blob/main/packages/eslint-plugin/src/${ruleName}.md`,
)

export const createRule = RuleCreator