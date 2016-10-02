const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const config = require('./webpack.base.js');

const { CLIENT_JS_ENTRY, CLIENT_STYLE_ENTRY, CLIENT_OUTPUT, PUBLIC_PATH } = config;
const extractLess = new ExtractTextPlugin('common.css');


module.exports = {
  context: path.resolve(__dirname, '..'),

  entry: [
    CLIENT_JS_ENTRY,
    CLIENT_STYLE_ENTRY
  ],

  output: {
    path: CLIENT_OUTPUT,
    filename: 'bundle.js',
    publicPath: PUBLIC_PATH
  },

  resolve: {
    extensions: ['', '.jsx', '.js', '.less', '.css']
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
          presets: ['es2015', 'react', 'stage-0', 'react-optimize']
        }
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      // {
      //   test: /\.css$/,
      //   include: /src\/style/,
      //   exclude: /node_modules/,
      //   loader: 'style!css'
      // },
      {
        test: /\.less$/,
        include: /src\/style/,
        exclude: /node_modules/,
        loader: extractLess.extract(['css', 'less'])
      }
    ]
  },

  plugins: [
    extractLess,
    new AssetsPlugin({ filename: 'assets.json' }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        dead_code: false,
        screw_ie8: true,
        drop_console: true,
        drop_debugger: true,
        unused: true,
        if_return: true,
        join_vars: true,
        booleans: true,
        sequences: true,
        conditionals: true,
        loops: true
      },
      mangle: true,
      comments: false
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      },
      NODE_ENV: JSON.stringify("production")
    }),
    new webpack.NoErrorsPlugin()
  ]
};
