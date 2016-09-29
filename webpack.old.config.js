const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const TARGET = process.env.npm_lifecycle_event;
process.env.BABEL_ENV = TARGET;

const PATHS = {
  app: './src/index.jsx',
  style: './src/style/common.less',
  build: path.resolve(__dirname, 'dist')
};

const common = {
  entry: [
    'webpack/hot/only-dev-server',
    PATHS.app,
    PATHS.style
  ],
  resolve: {
    extensions: ['', '.js', '.jsx', '.less']
  },
  output: {
    path: PATHS.build,
    filename: 'app.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel?cacheDirectory'],
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.less$/,
        loader: 'style!css!autoprefixer!less',
        exclude: /node_modules/
      }
    ]
  }
};

if (TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
    debug: true,
    cache: true,
    devtool: 'source-map',
    devServer: {
      contentBase: PATHS.build,
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,
      stats: 'errors-only',
      host: process.env.HOST,
      port: process.env.PORT || 8000
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    ]
  });
}

if (TARGET === 'build') {
  module.exports = merge(common, {});
}
