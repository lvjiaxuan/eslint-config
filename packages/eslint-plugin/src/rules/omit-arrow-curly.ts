import { ESLintUtils, type JSONSchema, TSESTree } from '@typescript-eslint/utils'

const createRule = ESLintUtils.RuleCreator(
  name => `https://github.com/lvjiaxuan/eslint-config/blob/main/packages/eslint-plugin-lvjiaxuan/src/rules/${ name }.ts`,
)

export const RULE_NAME = 'omit-arrow-curly'

export const schema: JSONSchema.JSONSchema4 = {
  type: 'array',
  minItems: 0,
  maxItems: 1,
  items: [
    {
      type: 'string',
      enum: [ 'always', 'never' ],
    },
  ],
}

export default createRule<['always' | 'never'], 'omitCurly'>({
  name: RULE_NAME,

  meta: {
    type: 'layout',
    docs: {
      description: 'This arrow function can omit block body.',
      recommended: 'stylistic',
    },
    schema,
    fixable: 'whitespace',
    hasSuggestions: true,
    messages: { omitCurly: 'This arrow function can omit block body.' },
    deprecated: true,
    replacedBy: [ 'arrow-body-style' ],
  },

  defaultOptions: [ 'always' ],

  create(context, options) {
    const sourceCode = context.getSourceCode()

    return {
      ArrowFunctionExpression(node) {
        if (options[0] == 'always' && node.body.type === TSESTree.AST_NODE_TYPES.BlockStatement) {

          const blockStatementNode = node.body

          if (blockStatementNode.body.length != 1) {
            return
          }

          if (![ 'ExpressionStatement', 'ReturnStatement' ].includes(blockStatementNode.body[0].type)) {
            return
          }

          const firstToken = sourceCode.getFirstToken(blockStatementNode)!
          const lastToken = sourceCode.getLastToken(blockStatementNode)!
          if (sourceCode.getCommentsAfter(firstToken).length || sourceCode.getCommentsBefore(lastToken).length) {
            return
          }

          context.report({
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
              const afterFirstToken = sourceCode.getTokenAfter(firstToken)!
              const beforeLastToken = sourceCode.getTokenBefore(lastToken)!

              return [
                fixer.removeRange([
                  blockStatementNode.range[0] - 1,
                  blockStatementNode.range[0]
                    + 1
                    + afterFirstToken.loc.start.column
                    + (blockStatementNode.body[0].type === TSESTree.AST_NODE_TYPES.ReturnStatement ? 7 : 0),
                ]),
                fixer.removeRange([ beforeLastToken.range[1], blockStatementNode.range[1] ]),
                // ..
              ]
            },
          })
        }
      },
    }
  },
})
