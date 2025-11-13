import type { TypedFlatConfigItem } from '@antfu/eslint-config'
import { describe, expect, it } from 'vitest'
import { resolveConfigs } from './respect-js-options'

/** 构造 antfu/typescript/rules 配置 */
function makeTsConfig(rules: Record<string, any>, files?: string[]): TypedFlatConfigItem {
  return { name: 'antfu/typescript/rules', files: files ?? ['**/*.ts'], rules }
}

/** 构造 antfu/javascript/rules 配置 */
function makeJsConfig(rules: Record<string, any>): TypedFlatConfigItem {
  return { name: 'antfu/javascript/rules', rules }
}

describe('createRespectJsOptionsOverride', () => {
  // 正常场景：severity 相同且 JS 有额外选项 → 应同步选项
  it('should sync JS rule options to TS rule when severity matches', () => {
    const result = resolveConfigs([
      makeTsConfig({
        'ts/no-unused-vars': 'error',
        'no-unused-vars': 'off',
      }),
      makeJsConfig({
        'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      }),
    ])

    expect(result.rules).toEqual({
      'ts/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    })
  })

  // TS 规则已有自定义选项（数组长度 >= 2）→ 跳过
  it('should skip when TS rule already has options', () => {
    const result = resolveConfigs([
      makeTsConfig({
        'ts/no-unused-vars': ['error', { args: 'none' }],
        'no-unused-vars': 'off',
      }),
      makeJsConfig({
        'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      }),
    ])

    expect(result.rules).toEqual({})
  })

  // TS 规则为 'off' → 跳过
  it('should skip when TS rule is off', () => {
    const result = resolveConfigs([
      makeTsConfig({
        'ts/no-unused-vars': 'off',
        'no-unused-vars': 'off',
      }),
      makeJsConfig({
        'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      }),
    ])

    expect(result.rules).toEqual({})
  })

  // 对应的非前缀规则未设为 'off' → 跳过
  it('should skip when corresponding non-prefixed rule is not off', () => {
    const result = resolveConfigs([
      makeTsConfig({
        'ts/no-unused-vars': 'error',
        'no-unused-vars': 'error',
      }),
      makeJsConfig({
        'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      }),
    ])

    expect(result.rules).toEqual({})
  })

  // JS 规则没有额外选项（数组长度 <= 1）→ 跳过
  it('should skip when JS rule has no options', () => {
    const result = resolveConfigs([
      makeTsConfig({
        'ts/no-unused-vars': 'error',
        'no-unused-vars': 'off',
      }),
      makeJsConfig({
        'no-unused-vars': ['error'],
      }),
    ])

    expect(result.rules).toEqual({})
  })

  // JS 规则为字符串 severity（非数组）→ 跳过
  it('should skip when JS rule is a string severity', () => {
    const result = resolveConfigs([
      makeTsConfig({
        'ts/no-unused-vars': 'error',
        'no-unused-vars': 'off',
      }),
      makeJsConfig({
        'no-unused-vars': 'error',
      }),
    ])

    expect(result.rules).toEqual({})
  })

  // severity 不匹配 → 跳过
  it('should skip when severity does not match', () => {
    const result = resolveConfigs([
      makeTsConfig({
        'ts/no-unused-vars': 'warn',
        'no-unused-vars': 'off',
      }),
      makeJsConfig({
        'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      }),
    ])

    expect(result.rules).toEqual({})
  })

  // 数字 severity 应被归一化（1 = warn, 2 = error）
  it('should normalize numeric severity and sync options', () => {
    const result = resolveConfigs([
      makeTsConfig({
        'ts/no-unused-vars': 2,
        'no-unused-vars': 'off',
      }),
      makeJsConfig({
        'no-unused-vars': [2, { argsIgnorePattern: '^_' }],
      }),
    ])

    expect(result.rules).toEqual({
      'ts/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    })
  })

  // 数字和字符 severity 要对应
  it('should require numeric and string severity to match', () => {
    const result = resolveConfigs([
      makeTsConfig({
        'ts/no-unused-vars': 'error',
        'no-unused-vars': 'off',
      }),
      makeJsConfig({
        'no-unused-vars': [2, { argsIgnorePattern: '^_' }],
      }),
    ])

    expect(result.rules).toEqual({
      'ts/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    })
  })

  // 非 ts/ 前缀的规则应被忽略
  it('should ignore non-ts prefixed rules', () => {
    const result = resolveConfigs([
      makeTsConfig({
        'no-console': 'error',
      }),
      makeJsConfig({
        'no-console': ['error', { allow: ['warn'] }],
      }),
    ])

    expect(result.rules).toEqual({})
  })

  // 返回值的 name 和 files 应正确设置
  it('should return correct name and files', () => {
    const files = ['**/*.ts', '**/*.tsx']
    const result = resolveConfigs([
      makeTsConfig({}, files),
      makeJsConfig({}),
    ])

    expect(result.name).toBe('lvjiaxuan/respect-js-options/rules')
    expect(result.files).toEqual(files)
  })
})
