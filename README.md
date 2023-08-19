# postcss-antd-fixes

[![NPM version](https://img.shields.io/npm/v/postcss-antd-fixes?color=a1b858&label=)](https://www.npmjs.com/package/postcss-antd-fixes)

PostCSS plugin tries to fix all issues about [antd](https://www.npmjs.com/package/antd) with any others global CSS reset

## Features

- support antd + [TailwindCSS preflight.css](https://github.com/tailwindlabs/tailwindcss/blob/master/src/css/preflight.css), ref: [ant-design/ant-design#38794](https://github.com/ant-design/ant-design/issues/38794)

## Usage

```js
// postcss.config.js
module.exports = {
  plugins: {
    'tailwindcss': {},
    'autoprefixer': {},
    'postcss-antd-fixes': {
      // Support multiple prefixes, if you do not custom antd class name prefix, it's not necessary option.
      prefixes: ['vp-antd', 'ant'],
    },
  },
}
```

## Build & Publish

- `npm run build`
- `npx changeset`
- `npx changeset version`
- `git commit`
- `npx changeset publish`
- `git push --follow-tags`

> [`changeset` prerelease doc](https://github.com/changesets/changesets/blob/main/docs/prereleases.md)

## License

[MIT](./LICENSE) License © 2023 [Yuns](https://github.com/yunsii)
