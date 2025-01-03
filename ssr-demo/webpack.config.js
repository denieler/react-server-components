const path = require('path');

module.exports = {
  mode: 'development',
  entry: [path.resolve(__dirname, './src/client.jsx')],
  output: {
    path: path.resolve(__dirname, 'public/static'),
    filename: 'client.bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-react', {
                runtime: 'automatic'
              }]
            ]
          }
        },
        exclude: /node_modules/,
      },
    ],
  },
}