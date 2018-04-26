/**
 * Created by Yinxiong on 2016/11/21.
 */

import babel from 'rollup-plugin-babel'

export default {
  entry: 'index.js',
  dest: 'build/csv2arr.js',
  moduleName: 'csv2arr',
  format: 'umd',
  plugins: [
    babel({
      exclude: 'node_modules/**'
    })
  ]
}