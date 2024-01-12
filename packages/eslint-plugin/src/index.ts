import type { TSESLint } from '@typescript-eslint/utils'
import preferGenericRestExtends from './prefer-generic-rest-extends'

export default {
  rules: {
    'prefer-generic-rest-extends': preferGenericRestExtends,
  },
} satisfies TSESLint.Linter.Plugin
