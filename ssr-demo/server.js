const babelRegister = require('@babel/register');

babelRegister({
  ignore: [/[\\\/](node_modules)[\\\/]/],
  presets: [['@babel/preset-react', {runtime: 'automatic'}]],
  plugins: ['@babel/transform-modules-commonjs'],
})

const express = require('express')
const fs = require('fs')
const path = require('path')
const { renderToString } = require('react-dom/server')
const React = require('react')

const App = require('./src/App').default

const app = express()
const PORT = 3030

// Serve static files (like the bundled client.js)
app.use('/static', express.static(path.join(__dirname, './public/static')))

// Route to render the app
app.get('/', (req, res) => {
  const template = fs.readFileSync(path.join(__dirname, './public/index.html'), 'utf8')
  const appHtml = renderToString(React.createElement(App, {}))
  const html = template.replace('{{content}}', appHtml)

  res.send(html)
})

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})