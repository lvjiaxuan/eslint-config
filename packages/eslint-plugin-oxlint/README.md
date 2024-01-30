(OXLint)[https://github.com/oxc-project/oxc#-linter].

# Usage

Flat config:
```js
import { oxlint } from '@lvjiaxuan/eslint-plugin-oxlint'

export default [
  oxlint()
]
```

Options:
```ts
type OptionsOXLint = {
  deny?: Category | 'all'
  allow?: (keyof OXLintRules)[]
  // plugins: TODO
} | boolean
```
