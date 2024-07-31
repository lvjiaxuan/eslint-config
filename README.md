[![npm](https://img.shields.io/npm/v/@lvjiaxuan/eslint-config)](https://www.npmjs.com/package/@lvjiaxuan/eslint-config)
[![code style](https://antfu.me/badge-code-style.svg)](https://github.com/antfu/eslint-config)

All rules inherit from [@antfu/eslint-config](https://github.com/antfu/eslint-config). The same as the usage.

# Features
1. Add my [@lvjiaxuan/eslint-plugin](https://github.com/lvjiaxuan/eslint-config/blob/main/packages/eslint-plugin/src/index.ts) with some rules.

2. Add my [@lvjiaxuan/eslint-plugin-oxlint](https://github.com/lvjiaxuan/eslint-config/tree/main/packages/eslint-plugin-oxlint/src/index.ts) for reducing ESLint's burden.

3. ~~Auto-list referenced projects in `tsconfig.json` if "TypeScript" is enabled. (Deprecated since the feature of [v8-beta](https://typescript-eslint.io/blog/announcing-typescript-eslint-v8-beta/#project-service))~~

## [OXLint](https://github.com/oxc-project/oxc#-linter)

A number of rules will be taken care of by OXLint to reduce ESLint's burden.

> [!WARNING]
> 1. The rules settings of antfu's will be overwritten.
> 2. Maybe some miss-handled rules will conflict with ESLint.

```js
// eslint.config.js
import lv from '@lvjiaxuan/eslint-config'

export default lv({
  oxlint: true // equals to `{ deny: 'correctness' }`.
})
```

> [Check](https://github.com/lvjiaxuan/eslint-config/blob/main/packages/eslint-config/src/types.ts) the `OXLintOptions` types.

Modify lint scritp:
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
