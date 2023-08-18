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
  plugins: [],
}

export default config
