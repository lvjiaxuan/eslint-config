const tsRules = require('./tsRules.json')

module.exports = {
  extends: '@lvjiaxuan/js',

  overrides: [
    {
      files: [ '**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts' ],

      excludedFiles: [ '**/*.md/*.*' ],

      extends: [
        /**
         * Already includes:
         * 1. parser: '@typescript-eslint/parser'
         * 2. plugins: ['@typescript-eslint']
         */
        // 'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-type-checked',
        'plugin:@typescript-eslint/stylistic-type-checked',
      ],

      parserOptions: {
        // https://typescript-eslint.io/docs/linting/type-linting
        tsconfigRootDir: process.cwd(),
        // https://typescript-eslint.io/linting/typed-linting/monorepos#wide-globs-in-parseroptionsproject
        project: [ './tsconfig.json', './tsconfig.*.json', './packages/*/tsconfig.json' ],
      },

      rules: {
        // turn off js rules
        ...tsRules,

        // https://typescript-eslint.io/rules/
        '@typescript-eslint/ban-ts-comment': [
          'warn', {
            'ts-check': 'allow-with-description',
            'ts-expect-error': 'allow-with-description',
            'ts-ignore': 'allow-with-description',
            'ts-nocheck': 'allow-with-description',
            // minimumDescriptionLength?: number;
          },
        ],
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-explicit-any': [ 'warn', { fixToUnknown: false, ignoreRestArgs: true } ],
        '@typescript-eslint/no-misused-promises': [
          'warn', {
            checksConditionals: true,
            checksSpreads: true,
            checksVoidReturn: false,
          },
        ],
        '@typescript-eslint/no-unsafe-return': 'warn',
        '@typescript-eslint/unbound-method': 'off',
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': [
          'warn', {
            // extend
            functions: false,
            classes: false,
            variables: false,
            allowNamedExports: true,
            // additional
            enums: true,
            typedefs: false,
            ignoreTypeReferences: true,
          },
        ],
        '@typescript-eslint/indent': [
          'warn', 2, {
            SwitchCase: 1,
            VariableDeclarator: 1,
            outerIIFEBody: 1,
            MemberExpression: 1,
            FunctionDeclaration: { parameters: 1, body: 1 },
            FunctionExpression: { parameters: 1, body: 1 },
            CallExpression: { arguments: 1 },
            ArrayExpression: 1,
            ObjectExpression: 1,
            ImportDeclaration: 1,
            flatTernaryExpressions: false,
            ignoreComments: false,
            ignoredNodes: [
              'TemplateLiteral *',
              'JSXElement',
              'JSXElement > *',
              'JSXAttribute',
              'JSXIdentifier',
              'JSXNamespacedName',
              'JSXMemberExpression',
              'JSXSpreadAttribute',
              'JSXExpressionContainer',
              'JSXOpeningElement',
              'JSXClosingElement',
              'JSXFragment',
              'JSXOpeningFragment',
              'JSXClosingFragment',
              'JSXText',
              'JSXEmptyExpression',
              'JSXSpreadChild',
              'TSTypeParameterInstantiation',
              'FunctionExpression > .params[decorators.length > 0]',
              'FunctionExpression > .params > :matches(Decorator, :not(:first-child))',
              'ClassBody.body > PropertyDefinition[decorators.length > 0] > .key',
            ],
            offsetTernaryExpressions: true,
          },
        ],

        // https://typescript-eslint.io/linting/troubleshooting#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
        'no-undef': 'off',
      },
    },
    {
      files: [ '**/tsconfig.json', '**/tsconfig.*.json' ],
      // parser: 'jsonc-eslint-parser',
      rules: {
        'jsonc/sort-keys': [
          'error',
          {
            pathPattern: '^$',
            order: [
              'extends',
              'compilerOptions',
              'references',
              'files',
              'include',
              'exclude',
            ],
          },
          {
            pathPattern: '^compilerOptions$',
            order: [
              /* Projects */
              'incremental',
              'composite',
              'tsBuildInfoFile',
              'disableSourceOfProjectReferenceRedirect',
              'disableSolutionSearching',
              'disableReferencedProjectLoad',
              /* Language and Environment */
              'target',
              'lib',
              'jsx',
              'experimentalDecorators',
              'emitDecoratorMetadata',
              'jsxFactory',
              'jsxFragmentFactory',
              'jsxImportSource',
              'reactNamespace',
              'noLib',
              'useDefineForClassFields',
              'moduleDetection',
              /* Modules */
              'module',
              'rootDir',
              'moduleResolution',
              'baseUrl',
              'paths',
              'rootDirs',
              'typeRoots',
              'types',
              'allowUmdGlobalAccess',
              'moduleSuffixes',
              'allowImportingTsExtensions',
              'resolvePackageJsonExports',
              'resolvePackageJsonImports',
              'customConditions',
              'resolveJsonModule',
              'allowArbitraryExtensions',
              'noResolve',
              /* JavaScript Support */
              'allowJs',
              'checkJs',
              'maxNodeModuleJsDepth',
              /* Emit */
              'declaration',
              'declarationMap',
              'emitDeclarationOnly',
              'sourceMap',
              'inlineSourceMap',
              'outFile',
              'outDir',
              'removeComments',
              'noEmit',
              'importHelpers',
              'importsNotUsedAsValues',
              'downlevelIteration',
              'sourceRoot',
              'mapRoot',
              'inlineSources',
              'emitBOM',
              'newLine',
              'stripInternal',
              'noEmitHelpers',
              'noEmitOnError',
              'preserveConstEnums',
              'declarationDir',
              'preserveValueImports',
              /* Interop Constraints */
              'isolatedModules',
              'verbatimModuleSyntax',
              'allowSyntheticDefaultImports',
              'esModuleInterop',
              'preserveSymlinks',
              'forceConsistentCasingInFileNames',
              /* Type Checking */
              'strict',
              'strictBindCallApply',
              'strictFunctionTypes',
              'strictNullChecks',
              'strictPropertyInitialization',
              'allowUnreachableCode',
              'allowUnusedLabels',
              'alwaysStrict',
              'exactOptionalPropertyTypes',
              'noFallthroughCasesInSwitch',
              'noImplicitAny',
              'noImplicitOverride',
              'noImplicitReturns',
              'noImplicitThis',
              'noPropertyAccessFromIndexSignature',
              'noUncheckedIndexedAccess',
              'noUnusedLocals',
              'noUnusedParameters',
              'useUnknownInCatchVariables',
              /* Completeness */
              'skipDefaultLibCheck',
              'skipLibCheck',
            ],
          },
        ],
      },
    },
  ],
}
