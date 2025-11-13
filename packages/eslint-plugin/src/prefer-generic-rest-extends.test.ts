import type { TestCasesOptions } from 'eslint-vitest-rule-tester'
import parser from '@typescript-eslint/parser'
import { run } from 'eslint-vitest-rule-tester'
import { expect } from 'vitest'
import rule from './prefer-generic-rest-extends'

const valids = [
  // 类型参数已约束为数组
  'const foo = 123\n\ntype ArrayType<T extends unknown[] = []> = [...T]',
  // 约束使用自定义参数名
  'const foo = 123\n\ntype ArrayType<TestArr extends unknown[] = []> = [...TestArr]',
  // 函数泛型参数已约束
  'const foo = 123\n\nfunction fun<T extends number[] = []>() {\n  // ...\n}',
] satisfies TestCasesOptions['valid']

const invalids = [
  {
    // 类型参数缺少数组约束，应自动修复
    code: 'const foo = 123\n\ntype ArrayType<T = []> = [...T]',
    output: 'const foo = 123\n\ntype ArrayType<T extends unknown[] = []> = [...T]',
    errors: [{ messageId: 'preferConstraint' }],
  },
  {
    // 自定义参数名缺少数组约束
    code: 'const foo = 123\n\ntype ArrayType<TestArr = []> = [...TestArr]',
    output: 'const foo = 123\n\ntype ArrayType<TestArr extends unknown[] = []> = [...TestArr]',
    errors: [{ messageId: 'preferConstraint' }],
  },
  {
    // 函数泛型参数缺少数组约束
    code: 'const foo = 123\n\nfunction fun<T = []>() {\n  // ...\n}',
    output: 'const foo = 123\n\nfunction fun<T extends unknown[] = []>() {\n  // ...\n}',
    errors: [{ messageId: 'preferConstraint' }],
  },
] satisfies TestCasesOptions['invalid']

run({
  name: 'prefer-generic-rest-extends',
  rule,
  languageOptions: {
    parser,
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },
  valid: valids,
  invalid: invalids,
  onResult(_case, result) {
    if (_case.type === 'invalid')
      expect(result.output).toMatchSnapshot()
  },
})
