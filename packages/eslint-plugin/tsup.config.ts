import { defineConfig } from 'tsup'

export default defineConfig({
  entry: [ 'src/index.ts', 'add.ts' ],
  target: 'node16',
  format: [ 'cjs', 'esm' ],
  splitting: true,
  dts: true,
  clean: true,
  esbuildOptions(options) {
    options.footer = { js: 'module.exports = module.exports.default;' }
  },
})
