import { execa } from 'execa'
import path from 'path'
import fs from 'fs'

const cwd = process.cwd()


// Setup
const pkgPath = path.resolve(cwd, 'package.json')

const pkgInfo = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
pkgInfo.eslintConfig = {
  // root: true,
  extends: '@lvjiaxuan',
}

fs.writeFileSync(pkgPath, JSON.stringify(pkgInfo, null, 2) + '\n')


// Install
execa('ni', [ '@lvjiaxuan/eslint-config', '-D' ], { stdio: 'inherit', cwd })
