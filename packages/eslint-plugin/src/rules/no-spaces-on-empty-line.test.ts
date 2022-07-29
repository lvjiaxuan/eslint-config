import { ESLintUtils } from '@typescript-eslint/utils'
import rule, { RULE_NAME } from './no-spaces-on-empty-line'
import { it } from 'vitest'

const ruleTester = new ESLintUtils.RuleTester({ parser: '@typescript-eslint/parser' })

it('runs', () => {

  ruleTester.run(RULE_NAME, rule, {
    valid: [
      // base
      'const foo = 1\n\nconst bar = 2',
      // template strings
      'const foo = `abc\n    \nabc`',
    ],
    invalid: [
      // base
      {
        code: 'const foo = 1\n  \nconst bar = 2',
        output: 'const foo = 1\n\nconst bar = 2',
        errors: [ { messageId: 'noSpaces' } ],
      },
      // template strings
    ],
  })
})
