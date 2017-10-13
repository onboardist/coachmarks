/* eslint new-cap: "off" */

const path = require('path');
// const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const plugins = [];

const env = process.env.NODE_ENV || '';
if (env.indexOf('prod') > -1) {
  plugins.push(new UglifyJSPlugin({
    uglifyOptions: {
      ie8: false,
      compress: {
        warnings: false,
      },
      output: {
        comments: false,
      },
    },
    sourceMap: true,
  }));
} else {
  plugins.push(new HtmlWebpackPlugin({
    template: path.join(__dirname, 'test/index.html'),
  }));
}

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'coachmarks.js',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
          },
        },
      },
    ],
  },

  devtool: '#cheap-module-source-map',
  plugins,

  devServer: {
    open: true,
    port: '4030',
  },
};
