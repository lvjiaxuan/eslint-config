import { ESLintUtils, type TSESTree } from '@typescript-eslint/utils'

const createRule = ESLintUtils.RuleCreator(
  name => `https://github.com/lvjiaxuan/eslint-config/blob/main/packages/eslint-plugin-lvjiaxuan/src/rules/${ name }.ts`,
)

export const RULE_NAME = 'no-spaces-on-empty-line'

export default createRule<[], 'noSpaces'>({
  name: RULE_NAME,

  meta: {
    type: 'layout',
    docs: {
      description: '禁止空行上出现空格。',
      recommended: 'stylistic',
    },
    schema: [],
    fixable: 'whitespace',
    hasSuggestions: true,
    messages: { noSpaces: '禁止空行上出现空格，这里有 {{spacesLength}} 个空格。' },
    deprecated: true, // The `no-trailing-spaces` of official eslint rule has already done.
    replacedBy: [ 'no-trailing-spaces' ],
  },

  defaultOptions: [],

  create(context) {
    const sourceCode = context.getSourceCode()
    const templateLiteralLines = new Set<number>()

    return {
      // 模板字符串不校验
      TemplateLiteral(node) {
        node.quasis.forEach(templateElement => {
          // eslint-disable-next-line max-len
          for (let ignoredLine = templateElement.loc.start.line; ignoredLine < templateElement.loc.end.line; ignoredLine++) {
            templateLiteralLines.add(ignoredLine)
          }
        })
      },
      // :exit 的意思是 node 遍历结束后再执行函数，而不是遍历开始时，即 `TemplateLiteral` 执行完后
      'Program:exit'(node: TSESTree.Program) {
        sourceCode.lines.forEach((lineString, index) => {
          if (!templateLiteralLines.has(index + 1) && /^[^\S]{0}\s+[^\S]{0}$/.test(lineString)) {
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
