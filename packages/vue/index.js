module.exports = {
  overrides: [
    {
      files: [ '*.vue' ],
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: [ '.vue' ],
      },
      // rules: {
      //   // 避免导致全局类型报错 #https://typescript-eslint.io/docs/linting/troubleshooting/#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
      //   'no-undef': 'off',
      // },

      rules: {
        'vue/no-setup-props-destructure': 'off',
        'vue/no-unused-vars': 'off',
        'no-undef': 'off',
      },
    },
  ],

  extends: [ 'plugin:vue/vue3-recommended', '@lvjiaxuan/ts' ],

  // rules: {
  //   'vue/no-setup-props-destructure': 'off',
  //   'vue/no-unused-vars': 'off',
  // },
}
