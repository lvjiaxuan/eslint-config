import { RuleTester } from '@typescript-eslint/rule-tester'
import rule, { RULE_NAME, schema } from './omit-arrow-curly'
import Ajv from 'ajv'

const ruleTester = new RuleTester()

describe('omit-arrow-curly: tests', () => it('base', () => ruleTester.run(RULE_NAME, rule, {
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
    `const fun = () => {
    if (true) {
      console.log(123)
    }
  }`,
    `const fun = () => {
    switch (true) {
      case 1 > 2: console.log(123)
      default: console.log(321)
    }
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
      output: `const fun = () => Object.keys({ a: 1, b: 2 })
      .filter(Boolean)
      .map(i => i + '--')
      .forEach(console.log)`,
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
    {
      code: `const obj = {
    fun: () => {
      Object.keys({ a: 1, b: 2 })
        .filter(Boolean)
        .map(i => i + '--')
        .forEach(console.log)
    },
    foo: 1
  }`,
      output: `const obj = {
    fun: () => Object.keys({ a: 1, b: 2 })
        .filter(Boolean)
        .map(i => i + '--')
        .forEach(console.log),
    foo: 1
  }`,
      errors: [ { messageId: 'omitCurly' } ],
    },
    {
      code: `const fun = () => {
    return 1
  }`,
      output: 'const fun = () => 1',
      errors: [ { messageId: 'omitCurly' } ],
    },
  ],
})))

describe('omit-arrow-curly: schema', () => {

  const ajv = new Ajv()
  const validator = ajv.compile(schema)

  it('base', () => {

    const valid = [
      [],
      [ 'always' ],
      [ 'never' ],
    ]

    const invalid = [
      [ 'always', 'never' ],
      [ 'other' ],
    ]

    const validRes = valid.map(v => validator(v))
    const inValidRes = invalid.map(v => validator(v))

    expect(validRes).not.toContain(false)
    expect(inValidRes).not.toContain(true)
  })
})
