export interface DefineFixOptions {
  selectors: string[]
}

export function defineFix(options: DefineFixOptions) {
  return options
}

export function getExcludeSelector(
  prefixClsArr: string[],
  hashPriority?: 'low' | 'high',
) {
  let excludeSelector = `:not(${prefixClsArr
    .map((item) => {
      return `[class^="${item}"]`
    })
    .join(', ')})`
  if (hashPriority !== 'high') {
    excludeSelector = `:where(${excludeSelector})`
  }
  return excludeSelector
}
