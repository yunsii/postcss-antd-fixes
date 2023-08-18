/** @type {import('postcss-load-config').Config} */
export default {
  plugins: {
    'tailwindcss': {},
    'autoprefixer': {},
    './dist/plugin.cjs': {
      prefixes: ['vp-antd', 'ant'],
    },
  },
}
