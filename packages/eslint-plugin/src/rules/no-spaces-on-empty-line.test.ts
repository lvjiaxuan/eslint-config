import { RuleTester } from '@typescript-eslint/rule-tester'
import rule, { RULE_NAME } from './no-spaces-on-empty-line'

const ruleTester = new RuleTester()

describe('no-spaces-on-empty-line: tests', () => it('base', () =>
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
  })))

