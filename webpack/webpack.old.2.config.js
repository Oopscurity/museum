const path = require('path');
const webpack = require('webpack');
const merge = require('merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

let webpackConfig = {
  context: __dirname,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.less', '.css']
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};

if (process.env.NODE_ENV === 'production') {
  webpackConfig = merge(webpackConfig,{
    devtool: "source-map",
    entry: [
      './src/index.jsx',
      './src/less/common.less'
    ],
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          loader: 'babel',
          exclude: /node_modules/
        },
        {
          test: /\.json$/,
          loader: 'json-loader'
        },
        { test: /\.(png|jpg|gif|jpeg)$/, loader: 'url-loader?limit=8192' },
        { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap') }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      }),
      new ExtractTextPlugin("app.css"),
      new webpack.optimize.UglifyJsPlugin({ minimize: true })
    ]
  });
} else {
  webpackConfig = merge(webpackConfig,{
    devtool: 'eval',
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          loader: 'babel',
          exclude: /node_modules/,
          query: {
            cacheDirectory: true,
            presets: [
              ['es2015', { "modules": false }],
              'react',
              'stage-1'
            ],
            env: {
              development: {
                presets: ['react-hmre']
              }
            }
          }
        },
        {
          test: /\.json$/,
          loader: 'json-loader'
        },
        { test: /\.(png|jpg|gif|jpeg)$/, loader: 'url-loader?limit=8192' },
        { test: /\.css$/, loader: 'style-loader!css-loader' }
      ]
    },
    entry: [
      'webpack-hot-middleware/client',
      './src/index.jsx'
    ],
    plugins: [
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    ]
  });
}

module.exports = webpackConfig;
