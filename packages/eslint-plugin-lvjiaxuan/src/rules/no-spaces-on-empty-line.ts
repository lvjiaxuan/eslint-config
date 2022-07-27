import { ESLintUtils, type TSESTree } from '@typescript-eslint/utils'

const createRule = ESLintUtils.RuleCreator(
  name => `https://github.com/lvjiaxuan/eslint-config/blob/main/packages/eslint-plugin-lvjiaxuan/src/rules/${ name }.ts`,
)

export const RULE_NAME = 'no-spaces-on-empty-line'

export default createRule({
  name: RULE_NAME,

  meta: {
    type: 'layout',
    docs: {
      description: '禁止空行上出现空格（个人洁癖）。',
      recommended: 'warn',
    },
    schema: [],
    fixable: 'whitespace',
    hasSuggestions: true,
    messages: { noSpaces: '禁止空行上出现空格（个人洁癖），这里有 {{spacesLength}} 个空格。' },
    deprecated: true, // The `no-trailing-spaces` of official eslint rule has already done.
  },

  defaultOptions: [],

  create(context) {
    const sourceCode = context.getSourceCode()
    const templateLiteralLines = new Set()

    return {
      // 字符串不校验
      TemplateLiteral(node) {
        node.quasis.forEach(templateElement => {
          // eslint-disable-next-line max-len
          for (let ignoredLine = templateElement.loc.start.line; ignoredLine < templateElement.loc.end.line; ignoredLine++) {
            templateLiteralLines.add(ignoredLine)
          }
        })
      },
      // :exit 的意思是 node 遍历结束后再执行函数，而不是遍历开始时
      'Program:exit'(node: TSESTree.Program) {
        sourceCode.lines.forEach((lineString, index) => {
          if ( !templateLiteralLines.has(index + 1) && /^[^\S]{0}\s+[^\S]{0}$/.test(lineString)) {
            // 过滤出仅有空格的行
            const spacesLength = lineString.length
            context.report({
              node,
              loc: {
                start: { line: index + 1, column: 0 },
                end: { line: index + 1, column: spacesLength },
              },
              messageId: 'noSpaces',
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
