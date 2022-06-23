module.exports = {
  overrides: [
    {
      files: [ '*.vue' ],
      extends: [ 'plugin:vue/vue3-recommended' ],
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: [ '.vue' ],
      },
      rules: {
        'vue/no-setup-props-destructure': 'off', // with reactivityTransform: true
        'vue/no-unused-vars': 'off',
        // 避免导致全局类型报错 #https://typescript-eslint.io/docs/linting/troubleshooting/#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
        'no-undef': 'off',
      },
    },
  ],

  extends: [ '@lvjiaxuan/ts' ],
}
