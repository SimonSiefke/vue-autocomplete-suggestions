const { version } = require('./package')

module.exports = {
  name: 'vue-autocomplete-suggestions',
  format: ['cjs', 'es', 'umd', 'umd-min'],
  compress: 'umd',
  plugins: ['vue'],
  vue: {},
  buble: {
    transforms: {
      generator: true,
      dangerousForOf: true,
    },
  },
}
