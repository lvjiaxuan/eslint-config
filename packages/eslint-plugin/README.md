# @lvjiaxuan/eslint-plugin

## Usage

Installation:
```shell
npm i @lvjiaxuan/eslint-plugin
```

*package.json* Setting:
```json
{
  "eslintConfig": {
    "extends": "plugin:@lvjiaxuan/recommended"
  }
}
```

> [`recommended` config detail.](https://github.com/lvjiaxuan/eslint-config/blob/main/packages/eslint-plugin/src/configs/recommended.ts)

## Rules

### [@lvjiaxuan/no-spaces-on-empty-line](./src/rules/no-spaces-on-empty-line.ts)

<!-- eslint-skip -->
```js
const foo = 1
   // A few spaces which would be detected and removed by this rule.
const bar = 2
```

> After I found it as well as [no-trailing-spaces](https://eslint.org/docs/latest/rules/no-trailing-spaces). So I set it deprecated, f--king sad.

### [@lvjiaxuan/prefer-constraint-tuple-type](./src/rules/prefer-constraint-tuple-type.ts)

<!-- eslint-skip -->
```ts
type Foo<BarArr = []> = [ ...BarArr ] // A rest element type must be an array type.(2574)
```

Maybe `BarArr` is better to extend a constraint type.
<!-- eslint-skip -->
```ts
type Foo<BarArr extends unknown[] = []> = [ ...BarArr ] // ok.
```

### [@lvjiaxuan/no-multi-empty-lines-in-pattern](./src/rules/no-multi-empty-lines-in-pattern.ts)

options:
```js
const way1 = { '@lvjiaxuan/no-multi-empty-lines-in-pattern': [ 'warn', { afterMaxLines: 0, beforeMaxLines: Infinity } ] } // default

const way2 = {
  '@lvjiaxuan/no-multi-empty-lines-in-pattern': [
    'warn',
    {
      ObjectExpression: { afterMaxLines: 0, beforeMaxLines: Infinity },
      // ObjectPattern:
      // ArrayExpression:
      // ArrayPattern:
    },
  ],
}

const way3 = {
  '@lvjiaxuan/no-multi-empty-lines-in-pattern': [
    'warn',
    { afterMaxLines: 0, beforeMaxLines: Infinity },
    {
      ObjectExpression: { afterMaxLines: 2, beforeMaxLines: 2 },
      // ObjectPattern:
      // ArrayExpression:
      // ArrayPattern:
    },
  ],
}
```

<!-- eslint-skip -->
```js
const obj = {
  a: 1,
  b: 2
// This line Would be fixed through removing.
// This line Would be fixed through removing.
}

const {
  a,
  b,
// This line Would be fixed through removing.
// This line Would be fixed through removing.
} = obj

const arr = [
  1,
  2,
// This line Would be fixed through removing.
// This line Would be fixed through removing.
]

const [
  c,
  d
// This line Would be fixed through removing.
// This line Would be fixed through removing.
] = arr
```

### [@lvjiaxuan/omit-arrow-curly](./src/rules/omit-arrow-curly.ts)

[See.](./src/rules/omit-arrow-curly.test.ts)
## Refer

- https://typescript-eslint.io/play/#showAST=es