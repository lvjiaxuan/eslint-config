const fs = require('node:fs')
const { rules: JSRules } = require('@lvjiaxuan/eslint-config-js')
const { rules: TSRules } = require('@typescript-eslint/eslint-plugin')

const rules = {}
for (const ruleName in JSRules) {
  if (Object.hasOwn(TSRules, ruleName)) {
    rules[ruleName] = 'off'
    rules['@typescript-eslint/' + ruleName] = JSRules[ruleName]
  }
}

fs.writeFileSync('./tsRules.json', `${ JSON.stringify(rules) }`, { encoding: 'utf-8' })
