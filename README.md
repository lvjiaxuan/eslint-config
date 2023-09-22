![actions](https://github.com/lvjiaxuan/eslint-config/actions/workflows/ci.yml/badge.svg)
[![npm](https://img.shields.io/npm/v/@lvjiaxuan/eslint-config)](https://www.npmjs.com/package/@lvjiaxuan/eslint-config)

According to this [issue](https://github.com/eslint/eslint/pull/15933), i highly recommend using the new flat config because it includes `.cjs` and `.mjs` files by default.

# Feature

- Support [ESLint Flat Config](https://eslint.org/docs/latest/use/configure/configuration-files-new).
- As a monorepo, the `vue` package includes the `ts` package, which in turn includes the `js` package. This means that if you are coding vue with ts, you only need to install the `vue` package instead of the ts package in the company..

## [My custom rules](./packages/eslint-plugin/README.md)

- [~~@lvjiaxuan/no-spaces-on-empty-line~~](./packages/eslint-plugin/src/rules/no-spaces-on-empty-line.ts) is deprecated.
- [@lvjiaxuan/prefer-constraint-tuple-type](./packages/eslint-plugin/src/rules/prefer-constraint-tuple-type.ts) is warning by default.
- [@lvjiaxuan/no-multi-empty-lines-in-pattern](./packages/eslint-plugin/src/rules/no-multi-empty-lines-in-pattern.ts) is warning by default.
- [@lvjiaxuan/omit-arrow-curly](./packages/eslint-plugin/src/rules/omit-arrow-curly.ts) is warning by default.

# Usage

Installation:
```bash
ni @lvjiaxuan/eslint-config -D # By @antfu/ni
npm i lvjiaxuan/eslint-config -D
pnpm add lvjiaxuan/eslint-config -D

nlx @lvjiaxuan/eslint-config # Shortcut
nlx @lvjiaxuan/eslint-plugin # Include custom rules
```

Fix on save. VScode settings as below:
```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

# Install the Flat Config

1. shortcut: `nlx @lvjiaxuan/eslint-plugin --flat` .
2. Setting `settings.json` to let ESLint extension supports flat config: `"eslint.experimental.useFlatConfig": true` .

> BTW, all packages own its flat config export like `pkg/flat` .

# Use [@rushstack/eslint-patch](https://www.npmjs.com/package/@rushstack/eslint-patch) with non-flat config

A patch that improves how ESLint loads plugins when working in a monorepo with a reusable toolchain

# Reference

- https://github.com/antfu/eslint-config
- https://eslint.org
- https://typescript-eslint.io
