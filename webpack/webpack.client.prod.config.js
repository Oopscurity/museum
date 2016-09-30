const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, '..'),

  entry: [
    'babel-polyfill',
    './src/index.jsx'
    //'../src/style/common.less'
  ],

  output: {
    path: 'dist',
    filename: 'bundle.js',
    publicPath: '/static/'
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
      }
      // {
      //   test: /\.css$/,
      //   include: /src\/style/,
      //   exclude: /node_modules/,
      //   loader: 'style!css'
      // },
      // {
      //   test: /\.less$/,
      //   include: /src\/style/,
      //   exclude: /node_modules/,
      //   loader: 'less'
      // }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    // new ExtractTextPlugin({
    //   filename: 'styles.css',
    //   allChunks: true
    // }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.NoErrorsPlugin()
  ]
};
