import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    './src/index',
    './add',
  ],
  clean: true,
  // declaration: true,
  failOnWarn: false,
  rollup: { emitCJS: true },
})
