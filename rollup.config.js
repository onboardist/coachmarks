import { merge } from 'lodash';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import legacy from 'rollup-plugin-legacy';
import livereload from 'rollup-plugin-livereload';
import resolve from 'rollup-plugin-node-resolve';
import less from 'less';
import serve from 'rollup-plugin-serve';
import string from 'rollup-plugin-string';
import uglify from 'rollup-plugin-uglify';
import sass from 'rollup-plugin-sass';
import svelte from 'rollup-plugin-svelte';
// import rollupAnalyzer from 'rollup-analyzer-plugin';
import { minify } from 'uglify-es';
import pkg from './package.json';

const config = {
  input: 'src/index.js',
  output: {
    file: pkg.main,
    format: 'umd',
  },
  name: 'coachmarks',
  sourcemap: true,
  plugins: [
    resolve({ browser: true }),
    commonjs(),
    legacy({
      'node_modules/leader-line/leader-line.min.js': 'LeaderLine',
    }),
    sass({
      insert: true,
    }),
    svelte({
      preprocess: {
        style: ({ content, attributes }) => {
          if (attributes.lang !== 'less') return;

          return less.render(content)
          .then(output => ({ code: output.css, map: output.map }));
        },
      },
    }),
    string({
      include: 'src/**/*.svg',
    }),
    babel({
      exclude: 'node_modules/**',
    }),
    filesize(),
    // rollupAnalyzer({ limit: 5 }),
  ],
};

export default [
  merge({}, config, {
    plugins: [
      process.env.DEV ? serve({
        open: false,
        contentBase: ['test', 'dist'],
        port: 10002,
      }) : undefined,
      process.env.DEV ? livereload({
        watch: ['dist'],
      }) : undefined,
    ],
  }),
  // Minified version
  merge({}, config, {
    output: {
      file: 'dist/coachmarks.umd.min.js',
      format: 'umd',
    },
    plugins: [
      uglify({ sourceMap: true }, minify),
    ],
  }),
  // Module
  merge({}, config, {
    // NOTE: this externalizes leader-line, which won't work because it exports a global variable that has to be loaded with a special loader
    // external: Object.keys(pkg.dependencies).concat(['path-svg/svg-path']),
    external: [
      'lodash',
      'raf',
    ],
    output: {
      file: pkg.module,
      format: 'es',
    },
  }),
];
