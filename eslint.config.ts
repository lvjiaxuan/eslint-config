import lv from './src'

export default lv({
  oxlint: true,
  ignores: ['packages/eslint-plugin-oxlint/category-rules.json'],
}, {
  rules: {
    'no-console': 'off',
  },
})
