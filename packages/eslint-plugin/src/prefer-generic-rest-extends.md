# prefer-generic-rest-extends

## Details

<!-- eslint-skip -->
```ts
// 👎 bad
type Foo<BarArr = []> = [ ...BarArr ] // A rest element type must be an array type.(2574)
```

Maybe `BarArr` is better to extends a constraint array type defaults to `unknown[]`.

<!-- eslint-skip -->
```ts
// 👍 good
type Foo<BarArr extends unknown[] = []> = [ ...BarArr ] // ok.
```

> And edit the `unknown` type.
