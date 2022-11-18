![actions](https://github.com/lvjiaxuan/eslint-config/actions/workflows/release.yml/badge.svg)
[![npm](https://img.shields.io/npm/v/@lvjiaxuan/eslint-config)](https://www.npmjs.com/package/@lvjiaxuan/eslint-config)

# Features

- Sync `js` rules to `ts` rules. [Refer](./packages/typescript/sync-rules.js).

## [My custom rules](./packages/eslint-plugin/README.md)

- [@lvjiaxuan/no-spaces-on-empty-line](./packages/eslint-plugin/src/rules/no-spaces-on-empty-line.ts) not used.
- [@lvjiaxuan/prefer-constraint-tuple-type](./packages/eslint-plugin/src/rules/prefer-constraint-tuple-type.ts) warning defaults.
- [@lvjiaxuan/no-multi-empty-lines-in-pattern](./packages/eslint-plugin/src/rules/no-multi-empty-lines-in-pattern.ts) warning defaults.
- [@lvjiaxuan/omit-arrow-curly](./packages/eslint-plugin/src/rules/omit-arrow-curly.ts) warning defaults.

# Usage

Installation:
```bash
ni @lvjiaxuan/eslint-config -D
npm i lvjiaxuan/eslint-config -D
pnpm add lvjiaxuan/eslint-config -D
```

*package.json* Setting:
```json
{
  "eslintConfig": {
    "extends": [
      "@lvjiaxuan"
    ]
  }
}
```

> Shortcut(uses [@antfu/ni](https://github.com/antfu/ni)): `nx @lvjiaxuan/eslint-config`

Fix on save. VScode settings as below:
```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

# Refer

- https://github.com/antfu/eslint-config
- https://eslint.org/
- https://typescript-eslint.io/
