[![npm](https://img.shields.io/npm/v/@lvjiaxuan/eslint-config)](https://www.npmjs.com/package/@lvjiaxuan/eslint-config)
[![code style](https://antfu.me/badge-code-style.svg)](https://github.com/antfu/eslint-config)

All rules inherit from [@antfu/eslint-config](https://github.com/antfu/eslint-config). The same as the usage.

# Features
1. Add my [@lvjiaxuan/eslint-plugin](https://github.com/lvjiaxuan/eslint-config/blob/main/packages/eslint-plugin/src/index.ts) with some rules.

2. Add my [@lvjiaxuan/eslint-plugin-oxlint](https://github.com/lvjiaxuan/eslint-config/tree/main/packages/eslint-plugin-oxlint/src/index.ts) for reducing ESLint's burden.

3. Auto-list referenced projects in `tsconfig.json` if "TypeScript" is enabled.

## Why auto-list referenced projects?

Because typescript-eslint supported project references as far as I know.

The issue https://github.com/typescript-eslint/typescript-eslint/issues/2094 had occurred to me before.

I saw a workaround that is to list all references explicitly in `parserOptions.project`, while the [typescript-eslint docs](https://typescript-eslint.io/packages/parser#project) is saying the same.

Additionally, a flag `EXPERIMENTAL_useSourceOfProjectReferenceRedirect` introduced in https://github.com/typescript-eslint/typescript-eslint/pull/2669 also works.

## Disable referenced projects auto-list

```js
// eslint.config.js
import lv from '@lvjiaxuan/eslint-config'

export default lv({
  typescript: {
    noReferencedProjects: true
  }
})
```

##  With [OXLint](https://github.com/oxc-project/oxc#-linter)

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
+    "lint": "npx oxlint && eslint",
+    "lintf": "npx oxlint --fix && eslint --fix"
  }
}
```
