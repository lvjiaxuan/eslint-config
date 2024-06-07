import process from 'node:process'
import { join } from 'node:path'
import { stat } from 'node:fs/promises'
import { readJson } from 'fs-extra/esm'

/**
 * Respect project references.
 * Allow a maximum of 4 levels and a minimum of 2 levels.
 */
export async function tsconfigs(options: { path?: string, level?: number, cwd?: string } = {}) {
  const paths: string[] = []
  try {
    const { path = 'tsconfig.json', level = 2, cwd = process.cwd() } = options

    const tsconfigJson = await readJson(join(cwd, path)) as {
      references?: { path: string }[]
    }

    paths.push(path)

    level && await Promise.all(
      tsconfigJson.references?.map(async (item) => {
        const stats = await stat(join(cwd, item.path))
        if (stats.isDirectory())
          paths.push(...await tsconfigs({ path: join(item.path, 'tsconfig.json'), level: level - 1, cwd }))
        else if (stats.isFile())
          paths.push(...await tsconfigs({ path: join(item.path), level: level - 1, cwd }))
      }) ?? [],
    )
  }
  catch (e) {
    console.error(e)
  }

  return [...new Set(paths)]
}
