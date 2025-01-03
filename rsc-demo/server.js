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
const {renderToPipeableStream, decodeReply} = require('react-server-dom-webpack/server.node');
const path = require('path');
const React = require('react');
const { PassThrough, Readable } = require('stream');
const { fileURLToPath } = require('url');
const App = require('./src/App').default;

const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.json());
app.use(express.text());

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

app.get('/rsc', (req, res) => {
  const manifest = readFileSync(
    path.resolve(__dirname, './dist/react-client-manifest.json'),
    'utf8'
  );
  const moduleMap = JSON.parse(manifest);

  const stream = renderToPipeableStream(
    React.createElement(App),
    moduleMap,
    {
      onError(err) {
        console.error('Error during rendering:', err);
      },
    }
  )

  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Cache-Control', 'no-cache');

  // Pipe the rendered output to the response
  stream.pipe(res).on('error', (err) => {
    console.error('Stream error:', err);
    res.status(500).end('Internal Server Error');
  });
})

app.post('/action', callServerAction);

async function callServerAction(req, res, context) {
  try {
    const serverReference = req.header("rsc-action");
    const [filepath, name] = serverReference.split("#");

    const resolvedPath = filepath.startsWith('file://')
      ? fileURLToPath(filepath)
      : path.resolve(filepath);
    const module = require(resolvedPath);
    const action = module[name];
    
    const formData = req.body;
    const args = await decodeReply(formData);

    const result = await action(...args);

    const manifest = readFileSync(
      path.resolve(__dirname, './dist/react-client-manifest.json'),
      'utf8'
    );

    const moduleMap = JSON.parse(manifest);
    const stream = renderToPipeableStream(result, { moduleMap });
    
    stream.pipe(res).on('error', (err) => {
      console.error('Stream error:', err);
      res.status(500).end('Internal Server Error');
    });
  } catch (err) {
    console.error("Error in callServerAction:", err);
    res.status(500).send("Internal Server Error");
  }
}

app.use(express.static('dist'));
