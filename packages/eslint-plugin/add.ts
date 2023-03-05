import { execaSync } from 'execa'
import path from 'node:path'
import fs from 'node:fs'
import minimist from 'minimist'

const args = minimist(process.argv.slice(2))
const flat = !!args.flat

try {

  const cwd = process.cwd()

  // Install
  execaSync('ni', [ '@lvjiaxuan/eslint-plugin', 'eslint', '-D', '--workspace-root=true' ], { stdio: 'inherit', cwd })

  // Setup
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

  process.exit(0)
} catch (error) {
  console.error(error)
  process.exit(1)
}
