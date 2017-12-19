import { merge } from 'lodash';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
// import postcss from 'rollup-plugin-postcss';
import filesize from 'rollup-plugin-filesize';
import scss from 'rollup-plugin-scss';
import string from 'rollup-plugin-string';
import uglify from 'rollup-plugin-uglify';
import { minify } from 'uglify-es';
import pkg from './package.json';

// browser-friendly UMD build
const config = {
  input: 'src/index.js',
  output: {
    file: pkg.browser,
    format: 'umd',
  },
  name: 'coachmarks',
  sourcemap: true,
  plugins: [
    resolve(), // so Rollup can find `ms`
    commonjs(), // so Rollup can convert `ms` to an ES module
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
    scss({
      output: false,
    }),
    // postcss(),
    string({
      include: 'src/**/*.{svg,html}',
    }),
    filesize(),
  ],
};

console.log(Object.assign({}, config, { output: { file: 'coachmarks.min.js' } }));

export default [
  config,
  merge({}, config, {
    output: {
      file: 'dist/coachmarks.min.js',
      format: 'umd',
    },
    plugins: [
      uglify({ sourceMap: true }, minify),
    ],
  }),

	// CommonJS (for Node) and ES module (for bundlers) build.
	// (We could have three entries in the configuration array
	// instead of two, but it's quicker to generate multiple
	// builds from a single configuration where possible, using
	// an array for the `output` option, where we can specify
	// `file` and `format` for each target)
  // {
  //   input: 'src/index.js',
  //   // external: ['ms'],
  //   output: [
	// 		{ file: pkg.main, format: 'cjs' },
	// 		{ file: pkg.module, format: 'es' },
  //   ],
  // },
];
