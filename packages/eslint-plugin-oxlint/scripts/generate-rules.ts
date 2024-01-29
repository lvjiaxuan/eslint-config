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
      categoryRules.set(categoryRegexMatch[0], new Set())
      lastAddCategory = categoryRegexMatch[0]
    }
    else {
      const ruleMatch = line.match(ruleRegex)
      ruleMatch && categoryRules.get(lastAddCategory)?.add(ruleMatch.groups!.ruleName)
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

  // await fs.writeJSON('./../test.json', json)
}

try {
  void main()
}
catch (e) {
  console.log(e)
}
