import { defineFix, getExcludeSelector } from '@/helpers'

/** ref: https://github.com/ant-design/ant-design/issues/38794 */
export const fix = defineFix({
  name: 'input',
  selectors: ['input', "[type='text']", "input:where(:not([type]))", "[type='email']", "[type='url']", "[type='password']", "[type='number']", "[type='date']", "[type='datetime-local']", "[type='month']", "[type='search']", "[type='tel']", "[type='time']", "[type='week']", "[multiple]", "textarea", "select"],
  handleRule(rule, options) {
    const { mixHashPriority, processedPrefixes } = options

    const rawSelectors: string[] = []
    const fixedSelectors: { from: string; to: string }[] = []
    rule.selectors.forEach((selectorItem) => {
      if (fix.selectors.includes(selectorItem)) {
        if (mixHashPriority) {
          const antdExcludeSelectors = processedPrefixes.map((item) => {
            return getExcludeSelector([item.prefixCls], item.hashPriority)
          })

          fixedSelectors.push({
            from: selectorItem,
            to: antdExcludeSelectors
              .map((antdExcludeSelector) => {
                return `${selectorItem}${antdExcludeSelector}`
              })
              .join(', '),
          })
        } else {
          const antdExcludeSelector = getExcludeSelector(
            processedPrefixes.map((item) => item.prefixCls),
            processedPrefixes[0].hashPriority,
          )
          fixedSelectors.push({
            from: selectorItem,
            to: `${selectorItem}${antdExcludeSelector}`,
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
})
