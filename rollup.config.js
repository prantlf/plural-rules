import { babel } from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import cleanup from 'rollup-plugin-cleanup'
import { terser } from 'rollup-plugin-terser'

export default [
  {
    input: 'src/index.js',
    output: {
      file: 'dist/index.js',
      format: 'cjs'
    },
    external: 'cldrpluralruleparser',
    plugins: [
      babel({
        exclude: 'node_modules/**',
        babelHelpers: 'bundled',
        presets: [
          [
            '@babel/preset-env',
            {
              targets: {
                node: '14'
              }
            }
          ]
        ]
      }),
      cleanup()
    ]
  },
  {
    input: 'src/code.js',
    output: {
      file: 'dist/code.js',
      format: 'cjs'
    },
    external: 'cldrpluralruleparser',
    plugins: [
      babel({
        exclude: 'node_modules/**',
        babelHelpers: 'bundled',
        presets: [
          [
            '@babel/preset-env',
            {
              targets: {
                node: '14'
              }
            }
          ]
        ]
      }),
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
      babel({
        exclude: 'node_modules/**',
        babelHelpers: 'bundled'
      }),
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
      babel({
        exclude: 'node_modules/**',
        babelHelpers: 'bundled'
      }),
      resolve(),
      commonjs(),
      terser()
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
      babel({
        exclude: 'node_modules/**',
        babelHelpers: 'bundled'
      }),
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
      babel({
        exclude: 'node_modules/**',
        babelHelpers: 'bundled'
      }),
      resolve(),
      commonjs(),
      terser()
    ]
  }
]
