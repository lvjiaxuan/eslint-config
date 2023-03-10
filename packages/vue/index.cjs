module.exports = {
  extends: '@lvjiaxuan/ts',

  overrides: [
    {
      files: [ '**/*.vue' ],
      extends: [ 'plugin:vue/vue3-recommended', '@vue/eslint-config-typescript/recommended' ],
      rules: {
        'vue/no-unused-vars': 'off',
        'vue/no-setup-props-destructure': 'off',
        'no-undef': 'off',
      },
    },
  ],
}
