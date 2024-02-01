import { join } from 'node:path'
import { $ } from 'execa'
import fs from 'fs-extra'

async function main() {
  const lines = (await $`pnpm dlx oxlint --rules`).stdout.split('\n')

  const categoryRules = new Map<string, Set<string>>()

  const categoryRegex = /^[A-Z]{1}[A-za-z]+(?=\s{1}\(\d+\):)/
  const ruleRegex = /^•\s{1}(?<pluginName>[a-z_-]+):\s{1}(?<ruleName>[a-z-]+)/
  let lastAddCategory: string = ''
  lines.forEach((line) => {
    const categoryRegexMatch = line.match(categoryRegex)

    if (categoryRegexMatch) {
      const category = categoryRegexMatch[0].toLowerCase()
      categoryRules.set(category, new Set())
      lastAddCategory = category
    }
    else {
      const ruleMatch = line.match(ruleRegex)
      if (ruleMatch) {
        const { pluginName, ruleName } = ruleMatch.groups!
        categoryRules
          .get(lastAddCategory)
          ?.add(`${pluginName === 'eslint' ? '' : `${pluginName.toLowerCase()}/`}${ruleName.toLowerCase()}`)
      }
    }
  })

  // toJSON
  const json: Record<string, Record<string, 'off'>> = {}
  for (const [name, value] of categoryRules) {
    json[name] = [...value].reduce((acc, i) => {
      acc[i] = 'off' as const
      return acc
    }, {} as Record<string, 'off'>)
  }

  await fs.writeJSON(join(__dirname, '..', 'category-rules.json'), json)
}

try {
  void main()
}
catch (e) {
  console.error(e)
}
