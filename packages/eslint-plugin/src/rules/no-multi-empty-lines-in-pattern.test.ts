import { RuleTester } from '@typescript-eslint/rule-tester'
import rule, { RULE_NAME } from './no-multi-empty-lines-in-pattern'

const ruleTester = new RuleTester()


// Maybe it could represent the other 3, which are ObjectPattern\ArrayExpression\ArrayPattern
describe('ObjectExpression', () => {

  it('base', () => ruleTester.run(RULE_NAME, rule, {
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

  it('afterMaxLines is 2', () => ruleTester.run(RULE_NAME, rule, {
    valid: [
      {
        code: `const obj = { // valid
  a: 1, // valid
  // valid


} // valid`,
        // @ts-ignore
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
        // @ts-ignore
        options: [ { afterMaxLines: 2 } ],
      },
    ],
  }))

  it('with nested', () => ruleTester.run(RULE_NAME, rule, {
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

  it('beforeMaxLines is 1', () => ruleTester.run(RULE_NAME, rule, {
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
        // @ts-ignore
        options: [ { beforeMaxLines: 1 } ],
      },
    ],
  }))
})
