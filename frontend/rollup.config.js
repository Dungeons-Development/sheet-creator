/* eslint-disable */
import resolve from '@rollup/plugin-node-resolve';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';

const extensions = [
  '.js', '.jsx', '.ts', '.tsx',
];

export default {
  input: 'src/index.tsx',
  output: {
    file: 'dist/bundle.js',
    format: 'umd'
  },
  plugins: [
    resolve({
      browser: true,
      extensions,
    }),
    commonjs(),
    babel({
      extensions,
      include: ['src/**/*'],
      presets: [
        ["@babel/preset-typescript"],
        ['@babel/preset-react',
        {
          'runtime': 'automatic',
        }]
      ],
      babelHelpers: 'bundled'
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    process.argv.includes('--watch') &&
      serve({
        host: '0.0.0.0',
        port: 3001,
        contentBase: 'dist',
      }),
    process.argv.includes('--watch') && livereload({ watch: 'dist' }),
  ]
}
