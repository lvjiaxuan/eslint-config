import { ESLintUtils } from '@typescript-eslint/utils'
import type { Rule } from 'eslint'



const RuleCreator = ESLintUtils.RuleCreator(
  ruleName => `https://github.com/lvjiaxuan/eslint-config/blob/main/packages/eslint-plugin/src/${ruleName}.md`,
)

export const createRule = RuleCreator