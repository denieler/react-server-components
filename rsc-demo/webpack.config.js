const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactServerWebpackPlugin = require('react-server-dom-webpack/plugin');

module.exports = {
    mode: 'development',
    entry: [path.resolve(__dirname, './src/boot.jsx')],
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
    plugins: [
      new HtmlWebpackPlugin({
        inject: true,
        template: path.resolve(__dirname, './public/index.html'),
        favicon: false
      }),
      new ReactServerWebpackPlugin({isServer: false}),
    ],
}