import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import cleanup from 'rollup-plugin-cleanup'
import { minify } from 'rollup-plugin-swc-minify'

export default [
  {
    input: 'src/index.js',
    output: [
      {
        file: 'dist/index.cjs',
        format: 'cjs',
        sourcemap: true
      },
      {
        file: 'dist/index.mjs',
        format: 'es',
        sourcemap: true
      },
      {
        file: 'dist/index.min.mjs',
        format: 'es',
        sourcemap: true,
        plugins: [minify()]
      }
    ],
    external: 'cldrpluralruleparser',
    plugins: [cleanup()]
  },
  {
    input: 'src/index.js',
    output: [
      {
        file: 'dist/index.umd.js',
        format: 'umd',
        name: 'pluralRules',
        sourcemap: true
      },
      {
        file: 'dist/index.umd.min.js',
        format: 'umd',
        name: 'pluralRules',
        sourcemap: true,
        plugins: [minify()]
      }
    ],
    plugins: [
      resolve(),
      commonjs(),
      cleanup()
    ]
  },
  {
    input: 'src/code.js',
    output: [
      {
        file: 'dist/code.cjs',
        format: 'cjs',
        sourcemap: true
      },
      {
        file: 'dist/code.mjs',
        format: 'es',
        sourcemap: true
      },
      {
        file: 'dist/code.mjs',
        format: 'es',
        sourcemap: true,
        plugins: [minify()]
      }
    ],
    external: 'cldrpluralruleparser',
    plugins: [cleanup()]
  },
  {
    input: 'src/code.js',
    output: [
      {
        file: 'dist/code.umd.js',
        format: 'umd',
        name: 'pluralRules',
        sourcemap: true
      },
      {
        file: 'dist/code.umd.min.js',
        format: 'umd',
        name: 'pluralRules',
        sourcemap: true,
        plugins: [minify()]
      }
    ],
    plugins: [
      resolve(),
      commonjs(),
      cleanup()
    ]
  }
]
