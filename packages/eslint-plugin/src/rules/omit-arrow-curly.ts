import { ESLintUtils, type TSESTree } from '@typescript-eslint/utils'

const createRule = ESLintUtils.RuleCreator(
  name => `https://github.com/lvjiaxuan/eslint-config/blob/main/packages/eslint-plugin-lvjiaxuan/src/rules/${ name }.ts`,
)

export const RULE_NAME = 'omit-arrow-curly'

export default createRule({
  name: RULE_NAME,

  meta: {
    type: 'layout',
    docs: {
      description: 'This arrow function can omit block body.',
      recommended: 'warn',
    },
    schema: [
      {
        enum: [ 'always', 'never' ],
        minItems: 0,
        maxItems: 1,
      },
    ],
    fixable: 'whitespace',
    hasSuggestions: true,
    messages: { omitCurly: 'This arrow function can omit block body.' },
  },

  defaultOptions: [ 'always' ],

  create(context, options) {
    const sourceCode = context.getSourceCode()


    return {
      ArrowFunctionExpression(node) {
        if (options[0] == 'always' && node.body.type === 'BlockStatement') {

          const blockStatementNode = node.body

          const firstToken = sourceCode.getFirstToken(blockStatementNode)!
          const lastToken = sourceCode.getLastToken(blockStatementNode)!
          const hasComments = sourceCode.getCommentsAfter(firstToken).length
            || sourceCode.getCommentsBefore(lastToken).length


          blockStatementNode.body.length == 1
          && !hasComments
          && context.report({
            node,
            loc: {
              start: node.loc.start,
              end: {
                line: blockStatementNode.loc.start.line,
                column: blockStatementNode.loc.start.column + 1,
              },
            },
            messageId: 'omitCurly',
            fix(fixer) {

              return [
                fixer.removeRange([ blockStatementNode.range[0] - 1, blockStatementNode.range[0] + 1 ]),
                fixer.removeRange([ blockStatementNode.range[1] - 1, blockStatementNode.range[1] ]),
                // ..
              ]
            },
          })
        }

        // if(options[0] == 'never') {

        // }
      },
    }
  },
})
