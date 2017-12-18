/* eslint new-cap: "off" */

const path = require('path');
// const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const plugins = [
  // new BundleAnalyzerPlugin(),
];

const env = process.env.NODE_ENV || '';
const isProd = env.indexOf('prod') > -1;
if (isProd) {
  plugins.push(new UglifyJSPlugin({
    uglifyOptions: {
      mangle: true,
      parallel: true,
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
    filename: isProd ? 'coachmarks.min.js' : 'coachmarks.js',
    library: 'coachmarks',
    libraryTarget: 'var',
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
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.svg$/,
        use: ['raw-loader'],
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
