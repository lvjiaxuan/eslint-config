import { RuleTester } from '@typescript-eslint/rule-tester'
import rule, { RULE_NAME } from './omit-arrow-curly'

const ruleTester = new RuleTester()


it('runs', () => ruleTester.run(RULE_NAME, rule, {
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
}))
