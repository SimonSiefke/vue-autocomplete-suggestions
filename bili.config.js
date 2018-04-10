const { version } = require('./package')
const typescript = require('rollup-plugin-typescript2')
const fs = require('fs')
const path = require('path')

const copy = (function() {
  // use iife to copy files only ones, even if
  // function is called multiple times
  let hasCopied = false
  return options => ({
    ongenerate() {
      if (hasCopied) {
        return
      }
      Object.entries(options).forEach(([src, target], index) => {
        if (index === 0) {
          console.log()
        }
        const sourceFile = path.resolve(__dirname, src)
        const targetFile = path.resolve(__dirname, target)
        fs.writeFileSync(targetFile, sourceFile)
        const stats = fs.statSync(sourceFile)
        const fileSizeInBytes = stats.size

        console.log(`✔️ copied ${src} to ${target} (${fileSizeInBytes} B)`)
        if (index === Object.entries(options).length - 1) {
          console.log('\n')
        }
      })
      hasCopied = true
    },
  })
})()

module.exports = {
  name: 'vue-autocomplete-suggestions',
  input: 'src/index.ts',
  format: ['cjs', 'es', 'umd', 'umd-min'],
  compress: 'umd',
  plugins: [
    'vue',
    typescript(),
    copy({
      './src/resetSearchIcon.svg': './dist/resetSearchIcon.svg',
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
    cjs: '2.5KB',
  },
}
