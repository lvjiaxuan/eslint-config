import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    './src/index',
    './src/flat',
    './add',
  ],
  clean: true,
  // declaration: true,
  failOnWarn: false,
  rollup: { emitCJS: true },
})
