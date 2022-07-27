# eslint-plugin-lvjiaxuan

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-lvjiaxuan`:

```sh
npm install eslint-plugin-lvjiaxuan --save-dev
```

## Usage

Add `lvjiaxuan` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "lvjiaxuan"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "lvjiaxuan/rule-name": 2
    }
}
```

## Supported Rules

* [no-spaces-on-empty-line](https://github.com/lvjiaxuan/eslint-config/blob/main/packages/eslint-plugin-lvjiaxuan/src/rules/no-spaces-on-empty-line.ts)


