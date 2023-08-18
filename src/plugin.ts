import { type PluginCreator } from 'postcss'

import fixes from './fixes'

const plugin: PluginCreator<{
  prefixes?: string[]
}> = (options) => {
  const { prefixes: antdPrefixes = ['ant'] } = options || {}

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
                const excludeSelectors = `:not(${antdPrefixes
                  .map((antdPrefixItem) => `[class^="${antdPrefixItem}"]`)
                  .join(', ')})`

                fixedSelectors.push({
                  from: selectorItem,
                  to: `${selectorItem}${excludeSelectors}`,
                })
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
