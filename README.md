[![npm](https://img.shields.io/npm/v/@lvjiaxuan/eslint-config)](https://www.npmjs.com/package/@lvjiaxuan/eslint-config)
[![code style](https://antfu.me/badge-code-style.svg)](https://github.com/antfu/eslint-config)

All rules are inherited from [@antfu/eslint-config](https://github.com/antfu/eslint-config). The usage is the same.

# Features
1. Includes my [@lvjiaxuan/eslint-plugin](https://github.com/lvjiaxuan/eslint-config/blob/main/packages/eslint-plugin/src/index.ts) with some rules.

2. Integrates [OXLint](https://github.com/oxc-project/oxc#-linter) as a config options to reduce ESLint's burden.

3. ~~**Deprecated**: Auto-list referenced projects in `tsconfig.json` if "TypeScript" is enabled. (Deprecated since the feature of [v8-beta](https://typescript-eslint.io/blog/announcing-typescript-eslint-v8-beta/#project-service))~~

## [OXLint](https://github.com/oxc-project/oxc#-linter)

The OXLint will take care of several rules to reduce ESLint's burden.

> [!WARNING]
> 1. Serveral rules settings of antfu's will be overwritten.
> 2. Maybe some mishandled rules will conflict with ESLint.

```js
// eslint.config.js
import lv from '@lvjiaxuan/eslint-config'

export default lv({
  // equals to `{ deny: 'correctness' }`.
  // Reference to https://oxc.rs/docs/guide/usage/linter/rules.html#correctness-173 .
  oxlint: true
})
```

> [Check](https://github.com/lvjiaxuan/eslint-config/blob/main/packages/eslint-config/src/types.ts) the `OXLintOptions` types.

Modify lint scripts:
<!-- eslint-skip -->
```diff
// package.json
{
  "scripts": {
-    "lint": "eslint ."
+    "lint": "npx oxlint && eslint",
+    "lintf": "npx oxlint --fix && eslint --fix"
  }
}
```
