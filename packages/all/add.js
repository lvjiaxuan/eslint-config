import { execaSync } from 'execa'
import path from 'path'
import fs from 'fs'

const cwd = process.cwd()

// Install
execaSync('ni', [ '@lvjiaxuan/eslint-config', 'eslint', '-D' ], { stdio: 'inherit', cwd })

// Setup
const pkgPath = path.resolve(cwd, 'package.json')

const pkgInfo = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
pkgInfo.eslintConfig = {
  // root: true,
  extends: '@lvjiaxuan',
}
pkgInfo.scripts = pkgInfo.scripts ?? {}
!pkgInfo.scripts.lint && (
  pkgInfo.scripts.lint = 'eslint .'
)

fs.writeFileSync(pkgPath, JSON.stringify(pkgInfo, null, 2) + '\n')

process.exit(0)