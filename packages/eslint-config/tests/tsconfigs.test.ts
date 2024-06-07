import { join } from 'node:path'
import { tsconfigs } from './../src/tsconfigs'

it('detect tsconfigPaths', async () => {
  const paths = await tsconfigs({
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
