import { defineConfig } from 'tsup'

export default defineConfig({
  clean: true,
  esbuildOptions(options) {
    // options.footer = { js: 'if(typeof exports === \'function\') { module.exports = exports.default }' }
  },
  outExtension({ format }) {
    const ext: Record<Omit<typeof format, 'iife'> & string, string> = { cjs: 'cjs', esm: 'mjs' }
    return { js: `.${ ext[format] ?? 'js' }` }
  },
})
