import { ESLintUtils, type TSESTree } from '@typescript-eslint/utils'

const createRule = ESLintUtils.RuleCreator(
  name => `https://github.com/lvjiaxuan/eslint-config/blob/main/packages/eslint-plugin-lvjiaxuan/src/rules/${ name }.ts`,
)

export const RULE_NAME = 'prefer-constraint-array-type'

export default createRule({
  name: RULE_NAME,

  meta: {
    type: 'problem',
    docs: {
      description: '建议缺省范形数组（元组）被类型约束。',
      recommended: 'warn',
    },
    schema: [],
    fixable: 'whitespace',
    hasSuggestions: true,
    messages: { preferConstraint: '建议缺省范形数组（元组）被类型约束。' },
  },

  defaultOptions: [],

  create(context) {

    return {
      TSTypeParameter(node) {
        if (node.default?.type === 'TSTupleType' && !node.constraint) {
          // defaults is array without constraint
          context.report({
            node,
            // loc:
            messageId: 'preferConstraint',
            // data:
            fix(fixer) {
              return fixer.insertTextAfterRange(
                [ node.name.range[1], node.name.range[1] ],
                ' extends unknown[]',
              )
            },
          })
        }
      },
    }
  },
})
