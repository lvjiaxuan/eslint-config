(OXLint)[https://github.com/oxc-project/oxc#-linter].

# Usage

Flat config:
```js
// eslint.config.js
import { oxlint } from '@lvjiaxuan/eslint-plugin-oxlint'

export default async () => [
  await oxlint()
]
```
