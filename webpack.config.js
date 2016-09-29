const path = require('path');
const webpack = require('webpack');
const merge = require('merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

let webpackConfig = {
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css']
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
      './src/index.jsx'
    ],
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          loader: 'babel',
          exclude: /node_modules/,
          include: __dirname
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
    devtool: 'inline-source-map',
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          loader: 'babel',
          exclude: /node_modules/,
          query: {
            presets: ['es2015', 'react', 'survivejs-kanban'],
            extra: {
              'react-transform': {
                transforms: [
                  {
                    transform: 'react-transform-hmr',
                    imports: ['react'],
                    locals: ['module']
                  }
                ]
              }
            }
          }
        },
        { test: /\.(png|jpg|gif|jpeg)$/, loader: 'url-loader?limit=8192' },
        { test: /\.css$/, loader: 'style-loader!css-loader' }
      ]
    },
    entry: [
      'webpack-hot-middleware/client',
      './src/client/index.js'
    ],
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  });
}

module.exports = webpackConfig;
