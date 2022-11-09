import { ESLintUtils } from '@typescript-eslint/utils'
import rule, { RULE_NAME } from './omit-arrow-curly'
import { it } from 'vitest'

const ruleTester = new ESLintUtils.RuleTester({ parser: '@typescript-eslint/parser' })


it('runs', () => {

  ruleTester.run(RULE_NAME, rule, {
    valid: [
      `const fun = () => Object.keys({ a: 1, b: 2 })
  .filter(Boolean)
  .map(i => i + '--')
  .forEach(console.log)`,
      `const fun = () => {
  // ...
  Object.keys({ a: 1, b: 2 })
    .filter(Boolean)
    .map(i => i + '--')
    .forEach(console.log)
}`,
    ],
    invalid: [
      {
        code: `const fun = () => {
  Object.keys({ a: 1, b: 2 })
    .filter(Boolean)
    .map(i => i + '--')
    .forEach(console.log)
}`,
        output: `const fun = () =>
  Object.keys({ a: 1, b: 2 })
    .filter(Boolean)
    .map(i => i + '--')
    .forEach(console.log)
`,
        errors: [
          {
            messageId: 'omitCurly',
            line: 1,
            endLine: 1,
            column: 13,
            endColumn: 20,
          },
        ],
      },
    ],
  })
})
