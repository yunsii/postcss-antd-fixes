import { type PluginCreator } from 'postcss'

import fixes from './fixes'

import type { PluginOptions, PrefixItem } from './types'

const plugin: PluginCreator<PluginOptions> = (options) => {
  const {
    prefixes: antdPrefixes = ['ant'],
    tokens,
    fixes: customFixes = {},
  } = options || {}

  const processedPrefixes: PrefixItem[] = antdPrefixes.map((item) => {
    if (typeof item === 'string') {
      return {
        prefixCls: item,
      }
    }
    return item
  })

  const mixHashPriority = processedPrefixes.slice(1).some((item) => {
    return item.hashPriority !== processedPrefixes[0].hashPriority
  })

  return {
    postcssPlugin: 'postcss-antd-fixes',
    Once: (root) => {
      fixes
        .filter((item) => {
          return customFixes[item.name as keyof typeof customFixes] !== false
        })
        .forEach((fix) => {
          root.walkRules(
            new RegExp(fix.selectors.map((item) => `(${item})`).join('|')),
            (rule) => {
              fix.handleRule(rule, {
                processedPrefixes,
                mixHashPriority,
                tokens,
              })
            },
          )
        })
    },
  }
}

plugin.postcss = true

export default plugin
