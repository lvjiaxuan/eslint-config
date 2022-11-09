import recommended from './configs/recommended'
import noSpacesINEmptyLine from './rules/no-spaces-on-empty-line'
import preferConstraintArrayType from './rules/prefer-constraint-array-type'
import noPatternMultiEmptyLines from './rules/no-multi-empty-lines-in-pattern'
import omitArrowCurly from './rules/omit-arrow-curly'

export default {
  configs: { recommended },
  rules: {
    'no-spaces-on-empty-line': noSpacesINEmptyLine,
    'prefer-constraint-array-type': preferConstraintArrayType,
    'no-multi-empty-lines-in-pattern': noPatternMultiEmptyLines,
    'omit-arrow-curly': omitArrowCurly,
  },
}
