// https://github.com/egoist/bundle-require/issues/40
// import lv from './packages/eslint-config/src/lv'

import lv from '@lvjiaxuan/eslint-config'

export default lv({ oxlint: { deny: 'perf' } })
