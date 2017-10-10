var path = require('path')
var utils = require('./utils')
var config = require('../config')
var webpack = require('webpack')
var HtmlWebpackInlinePlugin = require('html-webpack-inline-plugin')

var projectRoot = path.resolve(__dirname, '../')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    app: resolve('./src/main.jsx')
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json'],
    modules: [
      resolve('src'),
      resolve('node_modules'),
    ],
    alias: {
      '@src': resolve('src'),
      '@styles': resolve('src/assets/styles'),
      '@images': resolve('src/assets/images'),
      '@components': resolve('src/components'),
      '@webModule': resolve('web_modules'),
      '@services': resolve('src/services'),
      '@api': resolve('src/api'),
      '@mixins': resolve('src/mixins'),
      '@pages': resolve('src/pages'),
      '@stores': resolve('src/stores'),
      '@router': resolve('src/router')
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      React: 'react',
      Component: ['react', 'Component'],
      noop: ['@services/Constants', 'noop']
    }),
    new HtmlWebpackInlinePlugin()
  ]
}
