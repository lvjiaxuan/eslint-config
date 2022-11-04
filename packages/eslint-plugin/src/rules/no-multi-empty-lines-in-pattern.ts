import { ESLintUtils, type TSESTree } from '@typescript-eslint/utils'

const createRule = ESLintUtils.RuleCreator(
  name => `https://github.com/lvjiaxuan/eslint-config/blob/main/packages/eslint-plugin-lvjiaxuan/src/rules/${ name }.ts`,
)

export const RULE_NAME = 'no-multi-empty-lines-in-pattern'

export default createRule({
  name: RULE_NAME,

  meta: {
    type: 'layout',
    docs: {
      description: '禁止 `[ ... ] | { ... }` 前后多余的空行。',
      recommended: 'warn',
    },
    schema: [
      {
        type: 'object',
        properties: {
          afterMaxLines: {
            description: 'afterMaxLines',
            type: 'number',
          },
          beforeMaxLines: {
            description: 'beforeMaxLines',
            type: 'number',
          },
        },
        additionalProperties: false,
      },
    ],
    fixable: 'whitespace',
    hasSuggestions: true,
    messages: { noEmptyLine: '禁止 `[ ... ] | { ... }` 前后超过 {{maxLines}} 行的空行。当前一共 {{linesCount}} 行。' },
  },

  defaultOptions: [ { afterMaxLines: 0, beforeMaxLines: Infinity } ],

  create(context, [ { afterMaxLines = 0, beforeMaxLines = Infinity } ]) {
    const sourceCode = context.getSourceCode()

    const isSameLine = (node: TSESTree.BaseNode) => node.loc.start.line == node.loc.end.line

    if (!afterMaxLines) {
      afterMaxLines = 0
    }

    if (!beforeMaxLines && beforeMaxLines != 0) {
      beforeMaxLines = Infinity
    }

    return {
      'ObjectExpression'(node) {

        if (isSameLine(node)) return

        if (Math.abs(afterMaxLines) != Infinity) {
          const lastToken = sourceCode.getLastToken(node)!
          const beforeLastToken = sourceCode.getTokenBefore(lastToken, { includeComments: true })!

          const linesCount = lastToken.loc.start.line - beforeLastToken.loc.start.line
          if (linesCount > afterMaxLines + 1) {
            context.report({
              node,
              loc: {
                start: {
                  line: beforeLastToken.loc.start.line + 1,
                  column: 0,
                },
                end: {
                  line: lastToken.loc.start.line - 1 - afterMaxLines,
                  column: 0,
                },
              },
              data: { linesCount: linesCount - 1, maxLines: afterMaxLines },
              messageId: 'noEmptyLine',
              // data:
              fix(fixer) {
                return fixer.removeRange([ beforeLastToken.range[1], lastToken.range[0] - lastToken.loc.end.column - afterMaxLines ])
              },
            })
          }
        }


        if (Math.abs(beforeMaxLines) != Infinity) {

          let firstToken = sourceCode.getFirstToken(node, { includeComments: true })!
          let afterFirstToken = sourceCode.getTokenAfter(firstToken, { includeComments: true })!

          if (firstToken.loc.start.line == afterFirstToken.loc.start.line) {
            firstToken = afterFirstToken
            afterFirstToken = sourceCode.getTokenAfter(firstToken, { includeComments: true })!
          }

          const linesCount = afterFirstToken.loc.start.line - firstToken.loc.start.line
          if (linesCount > beforeMaxLines + 1) {
            context.report({
              node,
              loc: {
                start: {
                  line: firstToken.loc.start.line + 1 + beforeMaxLines,
                  column: 0,
                },
                end: {
                  line: afterFirstToken.loc.start.line - 1,
                  column: 0,
                },
              },
              messageId: 'noEmptyLine',
              data: { linesCount: linesCount - 1, maxLines: beforeMaxLines },
              fix(fixer) {
                return fixer.removeRange([ firstToken.range[1] + beforeMaxLines, afterFirstToken.range[0] - afterFirstToken.loc.start.column - 1 ])
              },
            })
          }
        }
      },
    }
  },
})
