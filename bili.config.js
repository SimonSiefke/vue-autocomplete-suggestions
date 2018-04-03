const { version } = require('./package')

const banner = `/**
 * vue-autocomplete-suggestions v${version}
 * (c) Simon Siefke <simon.siefke@gmail.com>
 * https://github.com/SimonSiefke/vue-autocomplete-suggestions
 * Released under the MIT License.
 */
`

module.exports = {
  name: 'vue-autocomplete-suggestions',
  banner,
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
