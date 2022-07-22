import { ESLintUtils } from '@typescript-eslint/utils'
import rule, { RULE_NAME } from './no-spaces-in-empty-line'
import { it } from 'vitest'

it('runs', () => {
  const ruleTester = new ESLintUtils.RuleTester({ parser: '@typescript-eslint/parser' })

  ruleTester.run(RULE_NAME, rule, {
    valid: [
      // base
      'const foo = 1\n\nconst bar = 2',
    ],
    invalid: [
      {
        code: 'const foo = 1\n  \nconst bar = 2',
        output: 'const foo = 1\n\nconst bar = 2',
        errors: [ { messageId: 'msg01' } ],
      },
    ],
  })
})
