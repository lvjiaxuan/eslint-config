![actions](https://github.com/lvjiaxuan/eslint-config/actions/workflows/release.yml/badge.svg)
[![npm](https://img.shields.io/npm/v/@lvjiaxuan/eslint-config)](https://www.npmjs.com/package/@lvjiaxuan/eslint-config)

# Features

- Sync `js` rules to `ts` rules. [Refer](https://github.com/lvjiaxuan/eslint-config/blob/main/packages/typescript/sync-rules.js).

## Supported Rules

- [prefer-constraint-array-type](https://github.com/lvjiaxuan/eslint-config/blob/main/packages/eslint-plugin-lvjiaxuan/src/rules/prefer-constraint-array-type.ts) warning defaults.

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

> Shortcut: `nx @lvjiaxuan/eslint-config`

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
