module.exports = {
  entry: 'demo/main.ts',
  dist: 'demo/dist',
  homepage: './',
  html: {
    template: 'demo/index.html',
  },
  presets: [require('poi-preset-typescript')()],
}
