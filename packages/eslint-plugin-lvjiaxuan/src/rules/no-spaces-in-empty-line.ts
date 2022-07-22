import { ESLintUtils } from '@typescript-eslint/utils'

const createRule = ESLintUtils.RuleCreator(
  name => name,
)

export const RULE_NAME = 'no-spaces-in-empty-line'

export default createRule({
  name: RULE_NAME,

  meta: {
    type: 'layout',
    docs: {
      description: '空行就不需要空格了（个人洁癖）。',
      recommended: 'warn',
      // suggestion
      // requiresTypeChecking
      // extendsBaseRule
    },
    schema: [],
    fixable: 'whitespace',
    hasSuggestions: true,
    messages: { msg01: '空行就不需要空格了（个人洁癖），这里有 {{spacesLength}} 个空格。' },
  },

  defaultOptions: [],

  create(context) {
    const sourceCode = context.getSourceCode()

    return {
      'Program:exit'(node) {
        sourceCode.lines.forEach((lineString, index) => {

          if (/^[^\S]{0}\s+[^\S]{0}$/.test(lineString)) {
            console.log({ lineString, index })
            // 过滤出仅有空格的行
            const spacesLength = lineString.length
            context.report({
              node,
              loc: {
                start: { line: index + 1, column: 0 },
                end: { line: index + 1, column: spacesLength },
              },
              messageId: 'msg01',
              data: { spacesLength },
              fix(fixer) {
                const rangeStart = sourceCode.getIndexFromLoc({ line: index + 1, column: 0 })
                const rangeEnd = sourceCode.getIndexFromLoc({ line: index + 1, column: spacesLength })
                return fixer.removeRange([ rangeStart, rangeEnd ])
              },
            })
          }
        }, [] as number[])
      },
    }
  },
})
