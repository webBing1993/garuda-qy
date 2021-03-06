var path = require('path')
var utils = require('./utils')
var config = require('../config')
// var wqtapi = require('../wqtapi')
var vueLoaderConfig = require('./vue-loader.conf')
const vuxLoader = require('vux-loader')
require("babel-polyfill");
require("string-replace-loader");
var argv = require('yargs').argv;

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

console.log("basePath:" + argv.basePath)

let webpackConfig = {
  entry: {
    app: ['babel-polyfill', './src/main.js']
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  module: {
    rules: [
      {
        test: /index\.html$/,
        loader: 'raw-loader'
      },
      {
        test: /index\.html$/,
        loader: 'string-replace-loader',
        options: {search: 'basePath', replace: argv.basePath}
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        // loader: 'url-loader/i/master',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}

module.exports = vuxLoader.merge(webpackConfig, {
  plugins: [
    {
      name: 'vux-ui'
    }
  ]
})
