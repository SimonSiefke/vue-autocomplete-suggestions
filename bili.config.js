const { version } = require('./package')
const typescript = require('rollup-plugin-typescript2')

module.exports = {
  name: 'vue-autocomplete-suggestions',
  input: 'src/index.ts',
  format: ['cjs', 'es', 'umd', 'umd-min'],
  compress: 'umd',
  plugins: ['vue', typescript()],
  buble: {
    transforms: {
      generator: true,
      dangerousForOf: true,
    },
  },
  globals: {
    vue: 'Vue',
  },
  external: ['vue'],
  sizeLimit: {
    cjs: '2KB',
  },
}
