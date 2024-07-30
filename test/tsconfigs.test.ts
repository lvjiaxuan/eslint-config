import { join } from 'node:path'
import { resolveTSConfigs } from '../packages/eslint-config/src/tsconfigs'

describe('tsconfigs tests', () => {

  it('detect tsconfig and its referenced paths', async () => {
    const paths = await resolveTSConfigs({
      cwd: join(import.meta.dirname, 'fixtures'),
    })
  
    expect(paths).toMatchInlineSnapshot(`
      [
        "tsconfig.json",
        "src\\tsconfig.json",
        "tsconfig.foo.json",
      ]
    `)
  })
})