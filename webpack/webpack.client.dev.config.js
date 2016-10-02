const webpack = require('webpack');
const config = require('./webpack.base.js');

const { CLIENT_JS_ENTRY, CLIENT_STYLE_ENTRY, CLIENT_OUTPUT, PUBLIC_PATH } = config;

module.exports = {
  entry: [
    'webpack-hot-middleware/client',
    CLIENT_JS_ENTRY,
    CLIENT_STYLE_ENTRY
  ],

  resolve: {
    'extensions': ['', '.jsx', '.js', '.less', '.css']
  },

  output: {
    filename: 'bundle.js',
    publicPath: PUBLIC_PATH,
    path: CLIENT_OUTPUT
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
      { test: /\.json$/, loader: 'json' },
      { test: /\.css$/, loader: 'style?sourceMap!css?sourceMap' },
      { test: /\.less$/, loader: 'style?sourceMap!css?sourceMap!less?sourceMap' }
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
