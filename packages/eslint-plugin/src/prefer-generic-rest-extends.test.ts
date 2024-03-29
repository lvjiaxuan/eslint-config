import { RuleTester } from '@typescript-eslint/rule-tester'
import { describe, it } from 'vitest'
import rule, { RULE_NAME } from './prefer-generic-rest-extends'

const ruleTester = new RuleTester()

describe('prefer-generic-rest-extends: tests', () => it('runs', () =>
  ruleTester.run(RULE_NAME, rule, {
    valid: [
      'const foo = 123\n\ntype ArrayType<T extends unknown[] = []> = [...T]',
      'const foo = 123\n\ntype ArrayType<TestArr extends unknown[] = []> = [...T]',
      'const foo = 123\n\nfunction fun<T extends number[] = []>() {\n  // ...\n}',
    ],
    invalid: [
      {
        code: 'const foo = 123\n\ntype ArrayType<T = []> = [...T]',
        output: 'const foo = 123\n\ntype ArrayType<T extends unknown[] = []> = [...T]',
        errors: [{ messageId: 'preferConstraint' }],
      },
      {
        code: 'const foo = 123\n\ntype ArrayType<TestArr = []> = [...T]',
        output: 'const foo = 123\n\ntype ArrayType<TestArr extends unknown[] = []> = [...T]',
        errors: [{ messageId: 'preferConstraint' }],
      },
      {
        code: 'const foo = 123\n\nfunction fun<T = []>() {\n  // ...\n}',
        output: 'const foo = 123\n\nfunction fun<T extends unknown[] = []>() {\n  // ...\n}',
        errors: [{ messageId: 'preferConstraint' }],
      },
    ],
  })))
