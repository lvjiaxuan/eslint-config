![actions](https://github.com/lvjiaxuan/eslint-config/actions/workflows/release.yml/badge.svg)
[![npm](https://img.shields.io/npm/v/@lvjiaxuan/eslint-config)](https://www.npmjs.com/package/@lvjiaxuan/eslint-config)

# Features

- Sync `js` rules to `ts` rules. [Refer](./packages/typescript/sync-rules.js).

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

nx @lvjiaxuan/eslint-config # Shortcut
nx @lvjiaxuan/eslint-plugin # Include custom rules
```

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
- https://eslint.org
- https://typescript-eslint.io
