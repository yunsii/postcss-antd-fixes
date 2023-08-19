/** @type {import('postcss-load-config').Config} */
module.exports = {
  plugins: {
    'tailwindcss': {},
    'autoprefixer': {},
    './dist/plugin.cjs': {
      prefixes: ['vp-antd', 'ant'],
    },
  },
}
