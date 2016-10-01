const fs = require('fs');
const webpack = require('webpack');
const path = require('path');
const config = require('./webpack.base.js');

const { SERVER_ENTRY, SERVER_OUTPUT, PUBLIC_PATH } = config;

function getExternals() {
  const nodeModules = fs.readdirSync(path.join(process.cwd(), 'node_modules'))
  return nodeModules.reduce(function (ext, mod) {
    ext[mod] = 'commonjs ' + mod;
    return ext;
  }, {});
}

module.exports = {
  target: 'node',

  entry: [
    SERVER_ENTRY
  ],

  externals: getExternals(),
  node: {
    __filename: true,
    __dirname: true
  },

  output: {
    path: SERVER_OUTPUT,
    filename: 'server.js'
  },

  resolve: {
    extensions: ['', '.jsx', '.js']
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/,
        presets: ['es2015', 'react', 'stage-0', 'react-optimize']
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },


  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.NoErrorsPlugin()
  ]
};
