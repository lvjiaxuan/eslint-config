import lv from '@lvjiaxuan/eslint-config'
import a from '@antfu/eslint-config'

export default a({
  oxlint: true,
}, {
  rules: {
    'no-console': 'off',
  },
})
