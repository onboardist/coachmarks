import { merge } from 'lodash';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import legacy from 'rollup-plugin-legacy';
import livereload from 'rollup-plugin-livereload';
import resolve from 'rollup-plugin-node-resolve';
import serve from 'rollup-plugin-serve';
import string from 'rollup-plugin-string';
import uglify from 'rollup-plugin-uglify';
import sass from 'rollup-plugin-sass';
import rollupAnalyzer from 'rollup-analyzer-plugin';
import { minify } from 'uglify-es';
import pkg from './package.json';

const config = {
  input: 'src/index.js',
  output: {
    file: pkg.browser,
    format: 'umd',
  },
  name: 'coachmarks',
  sourcemap: true,
  plugins: [
    resolve({ browser: true }),
    commonjs({
      // namedExports: {
      //   'node_modules/leader-line/leader-line.min.js': ['LeaderLine'],
      // },
    }),
    legacy({
      'node_modules/leader-line/leader-line.min.js': 'LeaderLine',
    }),
    // postcss({
    //   plugins: [
    //   // cssnext(),
    //   // yourPostcssPlugin()
    //   ],
    // // sourceMap: false, // default value
    // // extract: false, // default value
    //   extensions: ['.css', '.sss'],  // default value
    // // parser: sugarss
    // }),
    // scss({
    //   output: false,
    // }),
    sass({
      insert: true,
    }),
    // postcss(),
    string({
      include: 'src/**/*.{svg,html}',
    }),
    babel({
      exclude: 'node_modules/**',
    }),
    filesize(),
    rollupAnalyzer({ limit: 5 }),
  ],
};

export default [
  merge({}, config, {
    plugins: [
      process.env.DEV ? serve({
        open: true,
        contentBase: ['test', 'dist'],
        port: 10002,
      }) : undefined,
      process.env.DEV ? livereload({
        watch: ['dist'], // src
      }) : undefined,
    ],
  }),
  merge({}, config, {
    output: {
      file: 'dist/coachmarks.min.js',
      format: 'umd',
    },
    plugins: [
      uglify({ sourceMap: true }, minify),
    ],
  }),
];
