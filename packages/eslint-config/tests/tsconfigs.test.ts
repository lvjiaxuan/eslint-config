import { join } from 'node:path'
import { detectTsconfigPaths } from './../src/tsconfigs'

it('detectTsconfigPaths basic', async () => {
  const paths = await detectTsconfigPaths({
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
