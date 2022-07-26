const { rules: JSRules } = require('@lvjiaxuan/eslint-config-js')
const { rules: TSRules } = require('@typescript-eslint/eslint-plugin')

const extraRules = new Set([ 'no-use-before-define' ])

const rules = {}
for (const ruleName in JSRules) {
  if (!extraRules.has(ruleName) && Object.hasOwn(TSRules, ruleName)) {
    rules['@typescript-eslint/' + ruleName] = JSRules[ruleName]
  }
}

module.exports = rules
