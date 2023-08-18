import { defineFix } from '@/helpers'

export const fix = defineFix({
  selectors: ['button', "[type='button']", "[type='reset']", "[type='submit']"],
})
