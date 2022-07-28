module.exports = {
  extends: [ '@lvjiaxuan/ts' ],

  overrides: [
    {
      files: [ '*.vue' ],
      extends: [ 'plugin:vue/vue3-recommended' ],
      parserOptions: {
        parser: {
          // https://github.com/vuejs/vue-eslint-parser
          // 用于解析 <script> 里的脚本

          // Script parser for `<script>`
          js: 'espree',

          // Script parser for `<script lang="ts">`
          // More detail config set in `@lvjiaxuan/ts`
          ts: '@typescript-eslint/parser',

          // Script parser for vue directives (e.g. `v-if=` or `:attribute=`)
          // and vue interpolations (e.g. `{{variable}}`).
          // If not specified, the parser determined by `<script lang ="...">` is used.
          // "<template>": "espree",
        },
      },
      rules: {
        'vue/no-setup-props-destructure': 'off', // with reactivityTransform: true

        // 避免导致全局类型报错
        // refer to https://typescript-eslint.io/docs/linting/troubleshooting/#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
        'no-undef': 'off',
      },
    },
  ],

}
