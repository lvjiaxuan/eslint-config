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

> [`recommended` config detail](https://github.com/lvjiaxuan/eslint-config/blob/main/packages/eslint-plugin/src/configs/recommended.ts)

## Rules

### [no-spaces-on-empty-line](https://github.com/lvjiaxuan/eslint-config/blob/main/packages/eslint-plugin-lvjiaxuan/src/rules/no-spaces-on-empty-line.ts)

<!-- eslint-skip -->
```js
const foo = 1
   // A few spaces which would be detected and removed by this rule.
const bar = 2
```

> After I found it as well as [no-trailing-spaces](https://eslint.org/docs/latest/rules/no-trailing-spaces). So I set it deprecated, f--king sad.


### [prefer-constraint-array-type](https://github.com/lvjiaxuan/eslint-config/blob/main/packages/eslint-plugin-lvjiaxuan/src/rules/prefer-constraint-array-type.ts)

<!-- eslint-skip -->
```ts
type Foo<BarArr = []> = [ ...BarArr ] // A rest element type must be an array type.(2574)
```

Maybe It is Prefer to a constraint type.
<!-- eslint-skip -->
```ts
type Foo<BarArr extends unknown[] = []> = [ ...BarArr ] // ok.
```

## Refer

- https://typescript-eslint.io/play/#showAST=es