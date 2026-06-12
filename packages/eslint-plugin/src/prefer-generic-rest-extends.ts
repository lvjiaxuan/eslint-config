import type { RuleContext } from '@typescript-eslint/utils/ts-eslint'
import { TSESTree } from '@typescript-eslint/utils'
import { createRule } from './utils'

export default createRule({

  name: 'prefer-generic-rest-extends',

  meta: {
    type: 'suggestion',
    docs: {
      description: 'Generic type parameter with tuple default should extend an array type to support rest elements.',
      recommended: true,
      requiresTypeChecking: true,
    },
    schema: [],
    fixable: 'code',
    hasSuggestions: true,
    messages: { preferConstraint: 'Generic type parameter with tuple default should extend an array type to support rest elements.' },
    defaultOptions: [],
  },
  
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
