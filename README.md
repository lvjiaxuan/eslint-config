![actions](https://github.com/lvjiaxuan/eslint-config/actions/workflows/release.yml/badge.svg)
[![npm](https://img.shields.io/npm/v/@lvjiaxuan/eslint-config)](https://www.npmjs.com/package/@lvjiaxuan/eslint-config)


# Usage

Install:
```bash
ni @lvjiaxuan/eslint-config -D
npm i lvjiaxuan/eslint-config -D
pnpm add lvjiaxuan/eslint-config -D
```

*package.json*
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
