const register = require('react-server-dom-webpack/node-register');
register();
const babelRegister = require('@babel/register');

babelRegister({
  ignore: [/[\\\/](node_modules)[\\\/]/],
  presets: [['@babel/preset-react', {runtime: 'automatic'}]],
  plugins: ['@babel/transform-modules-commonjs'],
});

const express = require('express');
const {readFileSync} = require('fs');
const {renderToPipeableStream} = require('react-server-dom-webpack/server');
const path = require('path');
const React = require('react');
const ReactApp = require('./src/App').default;

const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.json());

app
  .listen(PORT, () => {
    console.log(`Listening at ${PORT}...`);
  })

app.get(
  '/',
  function(_req, res) {
    const html = readFileSync(
      path.resolve(__dirname, './dist/index.html'),
      'utf8'
    );

    res.send(html);
  }
);

app.get('/react', function(req, res) {
    const manifest = readFileSync(
        path.resolve(__dirname, './dist/react-client-manifest.json'),
        'utf8'
    );
    const moduleMap = JSON.parse(manifest);
    const {pipe} = renderToPipeableStream(
        React.createElement(ReactApp, {}),
        moduleMap
    );
    pipe(res);
});

app.use(express.static('dist'));
