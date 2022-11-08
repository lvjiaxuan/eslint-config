import { ESLintUtils, type TSESTree } from '@typescript-eslint/utils'
import lodashMerge from 'lodash.merge'

const createRule = ESLintUtils.RuleCreator(
  name => `https://github.com/lvjiaxuan/eslint-config/blob/main/packages/eslint-plugin-lvjiaxuan/src/rules/${ name }.ts`,
)

export const RULE_NAME = 'no-multi-empty-lines-in-pattern'

interface BaseOptions {
  afterMaxLines: number
  beforeMaxLines: number
}

interface PatternOptions {
  ObjectExpression?: BaseOptions
  ObjectPattern?: BaseOptions
  ArrayExpression?: BaseOptions
  ArrayPattern?: BaseOptions
}

export default createRule({
  name: RULE_NAME,

  meta: {
    type: 'layout',
    docs: {
      description: '禁止 `[ ... ] | { ... }` 前后多余的空行。',
      recommended: 'warn',
    },
    schema: {
      definitions: {
        baseConfig: {
          type: 'object',
          additionalProperties: false,
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
        },
        patternConfig: {
          type: 'object',
          additionalProperties: false,
          properties: {
            ObjectExpression: { $ref: '#/definitions/baseConfig' },
            ObjectPattern: { $ref: '#/definitions/baseConfig' },
            ArrayExpression: { $ref: '#/definitions/baseConfig' },
            ArrayPattern: { $ref: '#/definitions/baseConfig' },
          },
        },
      },
      items: {
        anyOf: [
          { $ref: '#/definitions/baseConfig' },
          { $ref: '#/definitions/patternConfig' },
          {
            type: 'array',
            items: [
              { $ref: '#/definitions/baseConfig' },
              { $ref: '#/definitions/patternConfig' },
            ],
          },
        ],
      },
    },
    fixable: 'whitespace',
    hasSuggestions: true,
    messages: { noEmptyLine: '禁止 `{{patternType}}` 前后超过 {{maxLines}} 行的空行。当前一共 {{linesCount}} 行。' },
  },

  // as [ BaseOptions | PatternOptions ] | [ BaseOptions, PatternOptions ]
  defaultOptions: [ { afterMaxLines: 0, beforeMaxLines: Infinity } ],

  create(context, options) {
    const sourceCode = context.getSourceCode()


    // normalize options
    const defaultBaseOptions = { afterMaxLines: 0, beforeMaxLines: Infinity }
    const patternOptions: PatternOptions = {
      ObjectExpression: void 0,
      ObjectPattern: void 0,
      ArrayExpression: void 0,
      ArrayPattern: void 0,
    }

    if (options.length == 1) {
      if ('afterMaxLines' in options[0] || 'beforeMaxLines' in options[0]) {
        // [ BaseOptions ]

        const { afterMaxLines = 0, beforeMaxLines = Infinity } = options[0] as BaseOptions
        patternOptions.ObjectExpression
          = patternOptions.ObjectPattern
          = patternOptions.ArrayExpression
          = patternOptions.ArrayPattern = {
                afterMaxLines,
                beforeMaxLines: beforeMaxLines == null ? Infinity : beforeMaxLines,
              }
      } else {
        // [ PatternOptions ]

        Object.keys(options[0])
          .forEach(nodeType => patternOptions[nodeType as keyof PatternOptions] = (options[0] as PatternOptions)[nodeType as keyof PatternOptions]
            ? lodashMerge(
              JSON.parse(JSON.stringify(defaultBaseOptions)) as BaseOptions,
              patternOptions[nodeType as keyof PatternOptions],
            )
            : defaultBaseOptions)
      }
    } else {
      // [ BaseOptions, PatternOptions ]

      const { afterMaxLines = 0, beforeMaxLines = Infinity } = options[0] as BaseOptions

      const mergeBaseOptions = lodashMerge(defaultBaseOptions, { afterMaxLines, beforeMaxLines })

      Object.keys(options[1])
        .forEach(nodeType => patternOptions[nodeType as keyof PatternOptions] =
          (options[1] as PatternOptions)[nodeType as keyof PatternOptions]
            ? lodashMerge(
              JSON.parse(JSON.stringify(mergeBaseOptions)) as BaseOptions,
              patternOptions[nodeType as keyof PatternOptions],
            )
            : mergeBaseOptions)
    }


    const main = (node: TSESTree.ObjectExpression
    | TSESTree.ObjectPattern
    | TSESTree.ArrayExpression
    | TSESTree.ArrayPattern,
    ) => {
      if (node.loc.start.line == node.loc.end.line) return

      const { afterMaxLines, beforeMaxLines } = patternOptions[node.type]!
      const patternType = (() => {
        let ret = ''
        switch (node.type) {
          case 'ObjectExpression':
          case 'ObjectPattern': {
            ret = '{ ... }'
            break
          }
          case 'ArrayExpression':
          case 'ArrayPattern': {
            ret = '[ ... ]'
            break
          }
          default:
        }
        return ret
      })()


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
            data: { linesCount: linesCount - 1, maxLines: afterMaxLines, patternType },
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
            data: { linesCount: linesCount - 1, maxLines: beforeMaxLines, patternType },
            fix(fixer) {
              return fixer.removeRange([ firstToken.range[1] + beforeMaxLines, afterFirstToken.range[0] - afterFirstToken.loc.start.column - 1 ])
            },
          })
        }
      }
    }

    return {
      ObjectExpression: main,
      ObjectPattern: main,
      ArrayExpression: main,
      ArrayPattern: main,
    }
  },
})
