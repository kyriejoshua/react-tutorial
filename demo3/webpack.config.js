var path = require('path');

module.exports = {
  entry: './scripts/index.js',
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
      },{
        test: /\.(js|jsx)$/,
        use: [{
            loader: 'babel-loader',
            query: {
              presets: ['es2015', 'stage-0', 'react']
            }
        }]
      }

    ]
  }
}
