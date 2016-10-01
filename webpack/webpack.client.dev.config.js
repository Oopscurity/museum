const path = require('path');
const webpack = require('webpack');

module.exports = {
  context: path.resolve(__dirname, '..'),

  entry: [
    'webpack-hot-middleware/client',
    './src/index.jsx'
  ],

  resolve: {
    'extensions': ['', '.jsx', '.js']
  },

  output: {
    filename: 'bundle.js',
    publicPath: '/',
    path: '/build/'
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|src\/server)/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
          presets: ['es2015', 'react', 'stage-0'],
          env: {
            development: {
              presets: ['react-hmre']
            }
          }
        }
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],

  devtool: 'eval'
};
