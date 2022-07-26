![actions](https://github.com/lvjiaxuan/eslint-config/actions/workflows/release.yml/badge.svg)
[![npm](https://img.shields.io/npm/v/@lvjiaxuan/prettier-config)](https://www.npmjs.com/package/@lvjiaxuan/eslint-config)


# Usage

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

Fix on save. VScode settings as below:
```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

# Refer

- https://eslint.org/
- https://typescript-eslint.io/
