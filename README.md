[![npm](https://img.shields.io/npm/v/@lvjiaxuan/eslint-config)](https://www.npmjs.com/package/@lvjiaxuan/eslint-config)
[![code style](https://antfu.me/badge-code-style.svg)](https://github.com/antfu/eslint-config)

All rules inherit from [@antfu/eslint-config](https://github.com/antfu/eslint-config).

# Features
1. Add my [@lvjiaxuan/eslint-plugin](https://github.com/lvjiaxuan/eslint-config/blob/main/packages/eslint-plugin/src/index.ts).
2. Auto-detect `tsconfig.json` and its references if TypeScript is enabled, which means enabling type-aware rules.
3. Add my [@lvjiaxuan/eslint-plugin-oxlint](https://github.com/lvjiaxuan/eslint-config/tree/main/packages/eslint-plugin-oxlint/src/index.ts).

# Usage

Follow [antfu's](https://github.com/antfu/eslint-config).

## Disable `tsconfig.json` auto-detected

```js
// eslint.config.js
import lv from '@lvjiaxuan/eslint-config'

export default lv({
  typescript: {
    notDetectTsconfig: true
  }
})
```

## With [OXLint](https://github.com/oxc-project/oxc#-linter)

A number of rules will be taken care of by OXLint to reduce ESLint's burden.

> [!NOTE]
> The rules settings of antfu's will be overwritten.

```js
// eslint.config.js
import lv from '@lvjiaxuan/eslint-config'

export default lv({
  oxlint: true // equals to `{ deny: 'correctness' }`.
})
```

Options type, respects its original [options](https://oxc-project.github.io/docs/guide/usage/linter.html#useful-options):
<!-- eslint-skip -->
```ts
/**
 * References https://oxc-project.github.io/docs/guide/usage/linter.html#useful-options-and-examples
 */
export type OXLintOptions = {

  /**
   * Deny the rule or category.
   *
   * @default 'correctness'
   */
  deny?: 'all' | Categories | Categories[]

  /**
   * Allow the rule or category.
   */
  allow?: (keyof OXLintRules)[]
} | boolean
```

> [!Tip]
> 1. [Categories](https://github.com/oxc-project/oxc/blob/main/crates/oxc_linter/src/rule.rs#L35) of OXLint.
> 2. [Rules](https://github.com/oxc-project/oxc/tree/main/crates/oxc_linter/src/rules) supported by OXLint.

Modify lint scritp:
<!-- eslint-skip -->
```diff
// package.json
{
  "scripts": {
-    "lint": "eslint ."
+    "lint": "npx oxlint . && eslint",
+    "lintf": "npx oxlint . --fix && eslint --fix"
  }
}
```
