module.exports = {
  extends: '@lvjiaxuan/ts',

  overrides: [
    {
      files: [ '**/*.vue' ],
      extends: [ 'plugin:vue/vue3-recommended', '@vue/eslint-config-typescript/recommended' ],
      rules: {
        'vue/no-unused-vars': [ 'warn', { ignorePattern: '^_' } ],
        'no-undef': 'off',
      },
    },
  ],
}
