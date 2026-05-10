import { createRuleTester } from 'eslint-vitest-rule-tester'
import parser from '@typescript-eslint/parser'
import rule from './prefer-generic-rest-extends'
import { describe, expect, it } from 'vitest'


const ruleTester = createRuleTester({
  name: 'prefer-generic-rest-extends',
  rule,
  configs: {
    languageOptions: {
      parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      }
    }
  }
})

ruleTester.run({
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
})