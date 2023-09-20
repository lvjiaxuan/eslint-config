import { RuleTester } from '@typescript-eslint/rule-tester'
import rule, { RULE_NAME, schema } from './no-multi-empty-lines-in-pattern'
import Ajv from 'ajv'

const ruleTester = new RuleTester()

// Maybe it could represent the other 3, which are ObjectPattern\ArrayExpression\ArrayPattern
describe('no-empty-line-after-import: test ObjectExpression', () => {

  it('default', () => ruleTester.run(RULE_NAME, rule, {
    valid: [
      'const obj = { // valid' +
        '\n  a: 1, // valid' +
        '\n  b: { // valid' +
        '\n    bb: 22 // valid' +
        '\n    // valid' +
        '\n  } // valid' +
        '\n} // valid',
    ],
    invalid: [
      {
        code: `const obj = { // valid
  a: 1, // valid

  // valid


} // valid`,
        output: `const obj = { // valid
  a: 1, // valid

  // valid
} // valid`,
        errors: [
          {
            column: 1,
            endColumn: 1,
            line: 5,
            endLine: 6,
            messageId: 'noEmptyLine',
            data: { linesCount: 2, maxLines: 0, patternType: '{ ... }' },
          },
        ],
      },
    ],
  }))

  it('{ afterMaxLines: 2 }', () => ruleTester.run(RULE_NAME, rule, {
    valid: [
      {
        code: `const obj = { // valid
  a: 1, // valid
  // valid


} // valid`,
        options: [ { afterMaxLines: 2 } ],
      },
    ],
    invalid: [
      {
        code: `const obj = { // valid
  a: 1, // valid
  // valid



} // valid`,
        output: `const obj = { // valid
  a: 1, // valid
  // valid


} // valid`,
        errors: [
          {
            messageId: 'noEmptyLine',
            line: 4,
            endLine: 4,
          },
        ],
        options: [ { afterMaxLines: 2 } ],
      },
    ],
  }))

  it('default with nested', () => ruleTester.run(RULE_NAME, rule, {
    valid: [],
    invalid: [
      {
        code: `const obj = { // valid
a: 1, // valid
b: { // valid
  bb: 22 // valid
  // valid


} // valid
// valid


} // valid`,
        output: `const obj = { // valid
a: 1, // valid
b: { // valid
  bb: 22 // valid
  // valid
} // valid
// valid
} // valid`,
        errors: [ { messageId: 'noEmptyLine' }, { messageId: 'noEmptyLine' } ],
      },
    ],
  }))

  it('{ beforeMaxLines: 1 }', () => ruleTester.run(RULE_NAME, rule, {
    valid: [],
    invalid: [
      {
        code: `const obj = { // valid


  // valid

  a: 1, // valid

  // valid


} // valid`,
        output: `const obj = { // valid

  // valid

  a: 1, // valid

  // valid
} // valid`,
        errors: [
          {
            messageId: 'noEmptyLine',
            line: 3,
            endLine: 3,
          },
          { messageId: 'noEmptyLine' },
        ],
        options: [ { beforeMaxLines: 1 } ],
      },
    ],
  }))
})

describe('no-empty-line-after-import: schema', () => {
  const ajv = new Ajv()
  const validator = ajv.compile(schema)


  it('single', () => {
    const valid = [
      [],
      [ { afterMaxLines: 4 } ],
      [ { afterMaxLines: 4, beforeMaxLines: 3 } ],
      [ { ObjectExpression: { afterMaxLines: 4 } } ],
    ]

    const res = valid.map(i => validator(i)).filter(Boolean)

    expect(res).not.toContain(false)
  })

  it('multiple', () => {
    const valid = [
      [ { beforeMaxLines: 3 }, { ArrayPattern: { afterMaxLines: 4 } } ],
      [ { ArrayPattern: { afterMaxLines: 4 } }, { beforeMaxLines: 3 } ],
    ]

    const res = valid.map(i => validator(i)).filter(Boolean)

    expect(res).not.toContain(false)
  })
})
