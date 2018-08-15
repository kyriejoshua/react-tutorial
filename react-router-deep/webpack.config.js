const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const routerPrefix = '/react-router'

module.exports = {
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }, {
        test: /\.(js|jsx)$/,
        use: [{
          loader: 'babel-loader',
          // 该选项必须添加
          query: {
            presets: ['es2015', 'stage-0', 'react']
          }
        }]
      }, {
        test: /\.html$/,
        loader: 'html-loader'
      }
    ]
  },
  // https://webpack.docschina.org/configuration/dev-server/#devserver-historyapifallback
  // /home 页面无法访问的解决办法，这是在 webpack-dev-server 层面需要支持的
  // 当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html。通过传入以下启用：
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        prefix: JSON.stringify(routerPrefix)
      }
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html'
    })
  ]
}
