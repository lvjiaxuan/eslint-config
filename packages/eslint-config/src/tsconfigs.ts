import process from 'node:process'
import { join } from 'node:path'
import { stat } from 'node:fs/promises'
import { readJson } from 'fs-extra/esm'
import type { TypedFlatConfigItem } from '@antfu/eslint-config'
import type { OverrideAntfuParams, OverrideOptionsConfigTypescript } from '.'
import { typescript } from '@antfu/eslint-config'

/**
 * Respect project references.
 * Allow a maximum of 4 level.
 */
export async function tsconfigs(configs: TypedFlatConfigItem[], antfuOption: OverrideAntfuParams[0]) {

  // The name is referenced to https://github.com/antfu/eslint-config/blob/073bfb8922eecddf41730680be3d9af8d623e7df/src/configs/typescript.ts#L86
  if (configs.findIndex(item => item.name === 'antfu/typescript/type-aware-parser') === -1)
    return;

  let tsOption = antfuOption?.typescript ?? {}

  let hasReferencedProjects = false
  if (typeof tsOption === 'object') {

    if (tsOption.noReferencedProjects === true) {
      // Do nothing.
    }
    else if ('parserOptions' in tsOption && tsOption.parserOptions) {
      // infer OptionsTypeScriptParserOptions

      // @ts-expect-error typescript-eslint beta
      if(tsOption.parserOptions?.project == null && tsOption.parserOptions?.projectService?.defaultProject == null) {
        const paths = await resolveReferencedProjects()
        if (paths.length) {
          tsOption.parserOptions.project ??= paths

          tsOption.parserOptions.projectService = {
            allowDefaultProject: ['./*.js'],
            defaultProject: paths,
          },

          hasReferencedProjects = true
        }
      }
    }
    // @ts-expect-error assert OptionsTypeScriptWithTypes
    else if (tsOption.tsconfigPath == null) {
      const paths = await resolveReferencedProjects()
      if (paths.length) {
        // @ts-expect-error assert OptionsTypeScriptWithTypes
        tsOption.tsconfigPath = paths
        hasReferencedProjects = true
      }
    }
  }
  else {
    // typescript = true
    const paths = await resolveReferencedProjects()
    if (paths.length) {
      // @ts-expect-error assert OptionsTypescript
      tsOption = {
        tsconfigPath: paths,
      } satisfies OverrideOptionsConfigTypescript
      hasReferencedProjects = true
    }
  }

  if (hasReferencedProjects) {

    // @ts-expect-error no project
    tsOption.parserOptions = {
      /**
       * @see https://github.com/typescript-eslint/typescript-eslint/blob/56bf020081815c1a20fedf897021fc19e0ea1023/docs/packages/Parser.mdx#warnonunsupportedtypescriptversion
       */
      warnOnUnsupportedTypeScriptVersion: true,
      /**
       * @see https://github.com/typescript-eslint/typescript-eslint/blob/56bf020081815c1a20fedf897021fc19e0ea1023/docs/packages/Parser.mdx#warnonunsupportedtypescriptversion
       */
      EXPERIMENTAL_useProjectService: true,
      /**
       * @see https://github.com/typescript-eslint/typescript-eslint/blob/56bf020081815c1a20fedf897021fc19e0ea1023/packages/typescript-estree/src/parseSettings/index.ts#L84
       */
      EXPERIMENTAL_useSourceOfProjectReferenceRedirect: true,
      // @ts-expect-error OptionsTypeScriptParserOptions
      ...tsOption.parserOptions ?? {},
    }

    // New ts flat config items with detected `tsconfigPath`.
    const flatConfigItemsWithTsConfig = await typescript(tsOption)

    const parserItemIdx = configs.findIndex(item => item.name === 'antfu/typescript/parser')
    configs.splice(
      parserItemIdx,
      1,
      flatConfigItemsWithTsConfig.find(item => item.name === 'antfu/typescript/type-aware-parser')!,
      flatConfigItemsWithTsConfig.find(item => item.name === 'antfu/typescript/parser')!,
    )

    const rulesItemIdx = configs.findIndex(item => item.name === 'antfu/typescript/rules')
    configs.splice(
      rulesItemIdx + 1,
      0,
      flatConfigItemsWithTsConfig.find(item => item.name === 'antfu/typescript/rules-type-aware')!,
    )
  }
}

export async function resolveAntfuTSConfigPaths(configs: TypedFlatConfigItem[], antfuOption: OverrideAntfuParams[0]) {
  // The name should reference to https://github.com/antfu/eslint-config/blob/073bfb8922eecddf41730680be3d9af8d623e7df/src/configs/typescript.ts#L86
  if (configs.findIndex(item => item.name === 'antfu/typescript/type-aware-parser') > -1) {
    let tsOption = antfuOption?.typescript

    let hasReferencedProjects = false
  if (typeof tsOption === 'object') {
    if ('noReferencedProjects' in tsOption && tsOption.noReferencedProjects === true) {
      // Do nothing.
    }
    else if ('parserOptions' in tsOption && tsOption.parserOptions?.project == null) { // !tsOption.parserOptions!.project
      // OptionsTypeScriptParserOptions
      const paths = await resolveReferencedProjects()
      if (paths.length) {
        tsOption.parserOptions!.project = paths
        hasReferencedProjects = true
      }
    }
    else if (!('tsconfigPath' in tsOption)) {
      const paths = await resolveReferencedProjects()
      if (paths.length) {
        tsOption as .tsconfigPath = paths
        hasReferencedProjects = true
      }
    }

    // @ts-expect-error OptionsTypeScriptParserOptions
    tsOption.parserOptions ??= {}
    // @ts-expect-error OptionsTypeScriptParserOptions
    // eslint-disable-next-line ts/no-unsafe-assignment
    tsOption.parserOptions = {
      /**
       * @see https://github.com/typescript-eslint/typescript-eslint/issues/2094#issuecomment-1820936720
       */
      warnOnUnsupportedTypeScriptVersion: true,
      EXPERIMENTAL_useProjectService: true,
      // @ts-expect-error OptionsTypeScriptParserOptions
      ...tsOption.parserOptions,
    }
  }
  }
}


export async function resolveReferencedProjects(options: { path?: string, level?: number, cwd?: string } = {}) {
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
          paths.push(...await resolveReferencedProjects({ path: join(item.path, 'tsconfig.json'), level: level - 1, cwd }))
        else if (stats.isFile())
          paths.push(...await resolveReferencedProjects({ path: join(item.path), level: level - 1, cwd }))
      }) ?? [],
    )
  }
  catch (e) {
    console.error(e)
  }

  return [...new Set(paths)].map(i => `./` + i)
}