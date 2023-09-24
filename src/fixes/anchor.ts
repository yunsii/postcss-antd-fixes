import type { Declaration } from 'postcss'

import { defineFix, getIncludeSelector } from '@/helpers'

/** ref: https://github.com/ant-design/ant-design/blob/f556a54dd53202fb500c083efa4b53c3725b6e0a/components/style/index.ts#L65 */
export const fix = defineFix({
  name: 'anchor',
  selectors: ['a'],
  handleRule(rule, options) {
    const { processedPrefixes, tokens } = options

    const rawSelectors: string[] = []
    const fixedSelectors: { from: string; to: string }[] = []
    const fixedDecls: Declaration[] = []

    rule.selectors.forEach((selectorItem) => {
      if (fix.selectors.includes(selectorItem)) {
        const antdDecls = {
          'color': tokens?.colorPrimary || '#1677FF',
          'text-decoration': 'none',
        }

        const antdDeclsProps = Object.keys(antdDecls)
        rule.walkDecls(
          new RegExp(antdDeclsProps.map((item) => `(${item})`).join('|')),
          (decl) => {
            if (
              antdDeclsProps.includes(decl.prop) &&
              decl.value === 'inherit'
            ) {
              const value = antdDecls[decl.prop as keyof typeof antdDecls]
              fixedDecls.push(
                decl.clone({
                  value,
                }),
              )
            }
          },
        )

        if (!fixedDecls.length) {
          return
        }

        const antdIncludeSelector = getIncludeSelector(
          processedPrefixes.map((item) => item.prefixCls),
        )
        fixedSelectors.push({
          from: selectorItem,
          to: `${antdIncludeSelector} ${selectorItem}`,
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
      nodes: fixedDecls,
    })
  },
})
