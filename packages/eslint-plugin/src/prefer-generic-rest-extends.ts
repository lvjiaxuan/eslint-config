import { ESLintUtils, TSESTree } from '@typescript-eslint/utils'

const createRule = ESLintUtils.RuleCreator(
  ruleName => `https://github.com/lvjiaxuan/eslint-config/blob/main/packages/eslint-plugin/src/${ruleName}.md`,
)

export const RULE_NAME = 'prefer-generic-rest-extends'

export default createRule<[], 'preferConstraint'>({
  name: RULE_NAME,

  meta: {
    type: 'suggestion',
    docs: {
      description: 'Enforce the rest element type extends a array type.',
    },
    schema: [],
    fixable: 'code',
    hasSuggestions: true,
    messages: { preferConstraint: 'Enforce the rest element type extends a array type.' },
  },

  defaultOptions: [],

  create(context) {
    return {
      TSTypeParameter(node) {
        if (node.default?.type === TSESTree.AST_NODE_TYPES.TSTupleType && !node.constraint) {
          // defaults is array without constraint
          context.report({
            node,
            messageId: 'preferConstraint',
            fix(fixer) {
              return fixer.insertTextAfterRange(
                [node.name.range[1], node.name.range[1]],
                ' extends unknown[]',
              )
            },
          })
        }
      },
    }
  },
})
