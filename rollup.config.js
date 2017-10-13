import path from 'path';
import pkg from './package.json';

// rollup.config.js
export default [{
  input: 'src/index.js',
  name: 'coachmarks',
  output: {
    file: pkg.browser,
    format: 'iife',
  },
  sourcemap: true,

  plugins: [
    require('rollup-plugin-uglify')(),
  ],
}];
