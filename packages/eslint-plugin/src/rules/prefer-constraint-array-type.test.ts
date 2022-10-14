import { ESLintUtils } from '@typescript-eslint/utils'
import rule, { RULE_NAME } from './prefer-constraint-array-type'
import { it } from 'vitest'

const ruleTester = new ESLintUtils.RuleTester({ parser: '@typescript-eslint/parser' })

it('runs', () => {

  ruleTester.run(RULE_NAME, rule, {
    valid: [
      'const foo = 123\n\ntype ArrayType<T extends unknown[] = []> = [...T]',
      // template strings
      'const foo = 123\n\nfunction fun<T extends number[] = []>() {\n  // ...\n}',
    ],
    invalid: [
      {
        code: 'const foo = 123\n\ntype ArrayType<T = []> = [...T]',
        output: 'const foo = 123\n\ntype ArrayType<T extends unknown[] = []> = [...T]',
        errors: [ { messageId: 'preferConstraint' } ],
      },
      {
        code: 'const foo = 123\n\nfunction fun<T = []>() {\n  // ...\n}',
        output: 'const foo = 123\n\nfunction fun<T extends unknown[] = []>() {\n  // ...\n}',
        errors: [ { messageId: 'preferConstraint' } ],
      },
    ],
  })
})
