/**
 * Created by Yinxiong on 2016/11/21.
 */

import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

export default {
  entry: 'index.js',
  dest: 'build/csv2arr.js',
  moduleName: 'csv2arr',
  format: 'umd',
  external: ['papaparse', 'jschardet'],
  globals: {
    papaparse: 'Papa',
    jschardet: 'Jschardet'
  },
  plugins: [
    // resolve({
    //   jsnext: true,
    //   main: true,
    //   browser: true
    // }),
    // commonjs(),
    babel({
      exclude: 'node_modules/**'
    })
  ]
}