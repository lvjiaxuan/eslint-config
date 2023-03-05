module.exports = {
  extends: [ '@lvjiaxuan/ts' ],

  overrides: [
    {
      files: [ '*.vue' ],
      extends: [ 'plugin:vue/vue3-recommended', '@vue/eslint-config-typescript/recommended' ],
      // parserOptions: {
      //   parser: {
      //     // https://github.com/vuejs/vue-eslint-parser
      //     // 用于解析 <script> 里的脚本

      //     // Script parser for `<script>`
      //     js: 'espree',

      //     // Script parser for `<script lang="ts">`
      //     // More detail config set in `@lvjiaxuan/ts`
      //     ts: '@typescript-eslint/parser',

      //     // Script parser for vue directives (e.g. `v-if=` or `:attribute=`)
      //     // and vue interpolations (e.g. `{{variable}}`).
      //     // If not specified, the parser determined by `<script lang ="...">` is used.
      //     // "<template>": "espree",
      //   },
      // },
      rules: {
          "vue/no-unused-vars": "off",
          "vue/no-setup-props-destructure": "off",
          "no-undef": "off"
      }
      ,
    },
  ],
}
