import { createRoot } from 'react-dom/client'
import { createFromReadableStream } from 'react-server-dom-webpack/client'

async function hydrate() {
  const response = await fetch('/rsc')
  const rscTree = createFromReadableStream(response.body)

  const container = document.getElementById('root')

  const root = createRoot(container)
  root.render(rscTree) 
}

hydrate()
