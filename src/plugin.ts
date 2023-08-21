import { type PluginCreator } from 'postcss'

import fixes from './fixes'
import { getExcludeSelector } from './helpers'

export interface PrefixItem {
  prefixCls: string
  hashPriority?: 'low' | 'high'
}

const plugin: PluginCreator<{
  prefixes?: (string | PrefixItem)[]
}> = (options) => {
  const { prefixes: antdPrefixes = ['ant'] } = options || {}

  const processedPrefixes: PrefixItem[] = antdPrefixes.map((item) => {
    if (typeof item === 'string') {
      return {
        prefixCls: item,
      }
    }
    return item
  })

  const mixHashPriority = processedPrefixes.slice(1).find((item) => {
    return item.hashPriority !== processedPrefixes[0].hashPriority
  })

  return {
    postcssPlugin: 'postcss-antd-fixes',
    Once: (root) => {
      fixes.forEach((fix) => {
        root.walkRules(
          new RegExp(fix.selectors.map((item) => `(${item})`).join('|')),
          (rule) => {
            const rawSelectors: string[] = []
            const fixedSelectors: { from: string; to: string }[] = []
            rule.selectors.forEach((selectorItem) => {
              if (fix.selectors.includes(selectorItem)) {
                if (mixHashPriority) {
                  const excludeSelectors = processedPrefixes.map((item) => {
                    return getExcludeSelector(
                      [item.prefixCls],
                      item.hashPriority,
                    )
                  })

                  fixedSelectors.push({
                    from: selectorItem,
                    to: excludeSelectors
                      .map((item) => `${selectorItem}${item}`)
                      .join(', '),
                  })
                } else {
                  const excludeSelector = getExcludeSelector(
                    processedPrefixes.map((item) => item.prefixCls),
                    processedPrefixes[0].hashPriority,
                  )
                  fixedSelectors.push({
                    from: selectorItem,
                    to: `${selectorItem}${excludeSelector}`,
                  })
                }
              } else {
                rawSelectors.push(selectorItem)
              }
            })

            if (fixedSelectors.length === 0) {
              return
            }

            rule.cloneAfter({
              selectors: fixedSelectors.map((item) => item.to),
            })
            if (fixedSelectors.length === rule.selectors.length) {
              rule.remove()
            } else {
              rule.replaceWith(
                rule.clone({
                  selectors: rawSelectors,
                }),
              )
            }
          },
        )
      })
    },
  }
}

plugin.postcss = true

export default plugin
