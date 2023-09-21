import { spawnSync } from 'node:child_process'
import path from 'node:path'
import fs from 'node:fs'

const argv = process.argv.slice(2)
const flat = argv.includes('--flat')
const argvWithoutFlat = argv.filter(i => i !== '--flat')

try {

  const cwd = process.cwd()

  // Install
  spawnSync('ni', [ '@lvjiaxuan/eslint-plugin', 'eslint', '-D', ...argvWithoutFlat ], { stdio: 'inherit', cwd })

  if (flat) {
    fs.writeFileSync(path.resolve(cwd, 'eslint.config.js'), 'export { default } from \'@lvjiaxuan/eslint-plugin/flat\'', { encoding: 'utf-8' })
    console.log('Flat config is installed and do next steps depends.')
    console.log('1. Create/Append `"eslint.experimental.useFlatConfig": true` on the `.vscode/settings.json`.')
    console.log('2. Append `"types": "module"` to the `package.json`.')
  } else {
    // Overwritten setup
    const pkgPath = path.resolve(cwd, 'package.json')
    const pkgInfo = JSON.parse(fs.readFileSync(pkgPath, 'utf-8')) as {
      scripts?: { [x: string]: string }
      eslintConfig?: {
        extends?: string | string[]
      }
    }
    pkgInfo.eslintConfig = pkgInfo.eslintConfig ?? {}

    if (typeof pkgInfo.eslintConfig.extends === 'string') {
      pkgInfo.eslintConfig.extends = [ pkgInfo.eslintConfig.extends, 'plugin:@lvjiaxuan/recommended' ]
    } else if (Array.isArray(pkgInfo.eslintConfig.extends)) {
      pkgInfo.eslintConfig.extends = [ ...pkgInfo.eslintConfig.extends, 'plugin:@lvjiaxuan/recommended' ]
    } else {
      pkgInfo.eslintConfig = { extends: 'plugin:@lvjiaxuan/recommended' }
    }

    pkgInfo.scripts = pkgInfo.scripts ?? {}
    !pkgInfo.scripts.lint && (
      pkgInfo.scripts.lint = 'eslint .'
    )

    fs.writeFileSync(pkgPath, JSON.stringify(pkgInfo, null, 2) + '\n')

    console.log('ESLint Config is set to the `package.json`.')
  }


  process.exit(0)
} catch (error) {
  console.error(error)
  process.exit(1)
}
