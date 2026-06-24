[![npm](https://img.shields.io/npm/v/@lvjiaxuan/eslint-config)](https://www.npmjs.com/package/@lvjiaxuan/eslint-config)
[![code style](https://antfu.me/badge-code-style.svg)](https://github.com/antfu/eslint-config)

# @lvjiaxuan/eslint-config

My personal ESLint config preset, extending [@antfu/eslint-config](https://github.com/antfu/eslint-config) with additional features.

## Install

```bash
npm install -D @lvjiaxuan/eslint-config eslint
```

## Usage

```js
// eslint.config.js
import lv from '@lvjiaxuan/eslint-config'

export default lv()
```

See [@antfu/eslint-config](https://github.com/antfu/eslint-config) for full usage and options.

## Features

1. Composes my [@lvjiaxuan/eslint-plugin](https://github.com/lvjiaxuan/eslint-config/tree/main/packages/eslint-plugin) with the [`prefer-generic-rest-extends`](https://github.com/lvjiaxuan/eslint-config/blob/main/packages/eslint-plugin/src/prefer-generic-rest-extends.md) rule.
2. Optional [OXLint](https://github.com/oxc-project/oxc#-linter) integration to offload rules from ESLint.
3. TS rules will always respect the JS base rule options.

## [OXLint](https://github.com/oxc-project/oxc#-linter)

OXLint can take care of several rules to reduce ESLint's burden. Pass `oxlint: true` to enable it:

> [!WARNING]
> 1. Several rule options from antfu's config may be overridden. (Use [@eslint/config-inspector](https://github.com/eslint/config-inspector) to check.)
> 2. Some OXLint rules may conflict with ESLint.

```js
// eslint.config.js
import lv from '@lvjiaxuan/eslint-config'

export default lv({
  oxlint: true,
})
```

Modify lint scripts to run OXLint before ESLint:
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

## License

[MIT](./LICENSE)
