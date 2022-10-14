import recommended from './configs/recommended'
import noSpacesINEmptyLine from './rules/no-spaces-on-empty-line'
import preferConstraintArrayType from './rules/prefer-constraint-array-type'

export default {
  configs: { recommended },
  rules: {
    'no-spaces-on-empty-line': noSpacesINEmptyLine,
    'prefer-constraint-array-type': preferConstraintArrayType,
  },
}
