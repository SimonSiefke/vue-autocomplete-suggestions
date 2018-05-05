const { version } = require('./package')
const typescript = require('rollup-plugin-typescript2')

module.exports = {
  name: 'vue-autocomplete-suggestions',
  input: 'src/index.ts',
  compress: 'umd',
  plugins: [
    'vue',
    typescript({
      cacheRoot: `./.rpt2_cache/${Math.random()}`,
      clean: true,
    }),
  ],
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
    cjs: '5KB',
  },
}
