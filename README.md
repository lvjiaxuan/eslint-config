[![npm](https://img.shields.io/npm/v/@lvjiaxuan/eslint-config)](https://www.npmjs.com/package/@lvjiaxuan/eslint-config)

All rules inherit from [@antfu/eslint-config](https://github.com/antfu/eslint-config).

# Features
1. Add my [@lvjiaxuan/eslint-plugin](https://github.com/lvjiaxuan/eslint-config/blob/main/packages/eslint-plugin/src/index.ts).
2. Try to detect `tsconfig.json` if TypeScript is enabled, which means enabling type-aware rules.
3. Add my [eslint-plugin-oxlint](https://github.com/lvjiaxuan/eslint-config/tree/main/packages/eslint-plugin-oxlint/src/index.ts).

> [!NOTE]
> *Why not just set `typescript.tsconfigPath` ?<br />*
> I have just encountered the Q. Perhaps a forced way of saying it is that the `tsconfig.json` is guaranteed to exists. :frowning:

# Usage

Follow [antfu's](https://github.com/antfu/eslint-config).

## With [OXLint](https://github.com/oxc-project/oxc#-linter)

> Aim to improve lint performance.

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
type OptionsOXLint = {
  deny?: Categories | 'all'
  allow?: (keyof OXLintRules)[]
  // plugins: TODO
} | boolean
```

> [!Tip]
> 1. [Categories](https://github.com/oxc-project/oxc/blob/2beacd3f4d2707ab64ff98bf05462673e9993b71/crates/oxc_linter/src/rule.rs#L37) of OXLint.
> 2. [Rules](https://github.com/oxc-project/oxc/tree/main/crates/oxc_linter/src/rules) supported by OXLint.

Modify lint scritp:
<!-- eslint-skip -->
```diff
// package.json
{
  "scripts": {
-    "lint": "eslint ."
+    "lint": "oxlint . && eslint ." // The `oxlint` has been installed, otherwise use alternative `npx oxlint`.
  }
}
```
