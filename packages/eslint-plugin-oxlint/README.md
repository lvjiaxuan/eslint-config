[OXLint](https://github.com/oxc-project/oxc#-linter)

# Usage

```js
// eslint.config.js
import { oxlint } from '@lvjiaxuan/eslint-plugin-oxlint'

export default async () => [
  await oxlint()
]
```

options:
<!-- eslint-skip -->
```ts
type OptionsOXLint = {
  deny?: Categories | 'all'
  allow?: (keyof OXLintRules)[]
  // plugins: TODO
} | boolean
```

Uses `true` options By default, equals to `{ deny: 'correctness' }`.

> [!NOTE]
> See OXLint's [categories](https://github.com/oxc-project/oxc/blob/2beacd3f4d2707ab64ff98bf05462673e9993b71/crates/oxc_linter/src/rule.rs#L37).
