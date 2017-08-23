const webpack = require('webpack');
const plugins = [];

plugins.push(
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
  })
);

module.exports = {
  entry: [
    'babel-polyfill',
    './src/app.ts'
  ],
  output: {
    filename: './dist/js/app.js'
  },
  devtool: process.env.NODE_ENV === 'prod' ? '' : 'inline-source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    loaders: [
      { test: /\.tsx?$/, loader: 'ts-loader' }
    ]
  },
  stats: {
    colors: true
  },
  plugins: plugins
}
