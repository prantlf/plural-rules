import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import cleanup from 'rollup-plugin-cleanup'
import { uglify } from 'rollup-plugin-uglify'

export default [
  {
    input: 'src/index.js',
    output: {
      file: 'dist/index.js',
      format: 'cjs'
    },
    plugins: [
      babel({ exclude: 'node_modules/**' }),
      cleanup()
    ]
  },
  {
    input: 'src/code.js',
    output: {
      file: 'dist/code.js',
      format: 'cjs'
    },
    plugins: [
      babel({ exclude: 'node_modules/**' }),
      cleanup()
    ]
  },
  {
    input: 'src/index.js',
    output: {
      file: 'dist/index.umd.js',
      format: 'umd',
      name: 'pluralRules',
      sourcemap: true
    },
    plugins: [
      babel({ exclude: 'node_modules/**' }),
      resolve(),
      commonjs(),
      cleanup()
    ]
  },
  {
    input: 'src/index.js',
    output: {
      file: 'dist/index.umd.min.js',
      format: 'umd',
      name: 'pluralRules',
      sourcemap: true
    },
    plugins: [
      babel({ exclude: 'node_modules/**' }),
      resolve(),
      commonjs(),
      uglify()
    ]
  },
  {
    input: 'src/code.js',
    output: {
      file: 'dist/code.umd.js',
      format: 'umd',
      name: 'pluralRules',
      sourcemap: true
    },
    plugins: [
      babel({ exclude: 'node_modules/**' }),
      resolve(),
      commonjs(),
      cleanup()
    ]
  },
  {
    input: 'src/code.js',
    output: {
      file: 'dist/code.umd.min.js',
      format: 'umd',
      name: 'pluralRules',
      sourcemap: true
    },
    plugins: [
      babel({ exclude: 'node_modules/**' }),
      resolve(),
      commonjs(),
      uglify()
    ]
  }
]
