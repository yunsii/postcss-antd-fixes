import { addDynamicIconSelectors } from 'tailwindcss-plugin-iconify'

import type { Config } from 'tailwindcss'

/** @type {import('tailwindcss').Config} */
const config: Config = {
  // corePlugins: {
  //   preflight: false,
  // },
  content: ['./docs/**/*.tsx', './docs/**/*.mdx'],
  theme: {
    extend: {},
  },
  plugins: [
    addDynamicIconSelectors({
      prefix: 'i',
      preprocessSets: ['bx'],
    }),
  ],
}

export default config
