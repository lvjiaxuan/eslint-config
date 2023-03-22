if (!process.env.ESLINT_USE_FLAT_CONFIG) {
  require('@rushstack/eslint-patch/modern-module-resolution')
}

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
