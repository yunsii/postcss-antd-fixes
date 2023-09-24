import type { PluginOptions, PrefixItem } from './types'
import type { Rule } from 'postcss'

export interface Options {
  processedPrefixes: PrefixItem[]
  mixHashPriority: boolean
  tokens: PluginOptions['tokens']
}

export interface DefineFixOptions {
  name: string
  selectors: string[]
  handleRule: (rule: Rule, options: Options) => void
}

export function defineFix(options: DefineFixOptions) {
  return {
    ...options,
  }
}

export function getAntdSelectors(prefixClsArr: string[]) {
  return prefixClsArr.map((item) => {
    return `[class^="${item}"]`
  })
}

export function getIncludeSelector(prefixClsArr: string[]) {
  let selector = `${getAntdSelectors(prefixClsArr).join(', ')}`
  selector = `:where(${selector})`
  return selector
}

export function getExcludeSelector(
  prefixClsArr: string[],
  hashPriority?: 'low' | 'high',
) {
  let selector = `:not(${getAntdSelectors(prefixClsArr).join(', ')})`
  if (hashPriority !== 'high') {
    selector = `:where(${selector})`
  }
  return selector
}
