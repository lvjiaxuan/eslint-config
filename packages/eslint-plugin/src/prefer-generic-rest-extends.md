# prefer-generic-rest-extends

## Details

```ts
// 👎 bad
type Foo<BarArr extends unknown[] = []> = [ ...BarArr ] // A rest element type must be an array type.(2574)
```

Maybe `BarArr` is better to extend a constraint type even unknown.

```ts
// 👍 good
type Foo<BarArr extends unknown[] = []> = [ ...BarArr ] // ok.
```

and edit the `v` type on yourself.
