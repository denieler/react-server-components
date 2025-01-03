import { createRoot } from 'react-dom/client'
import { createFromReadableStream, createFromFetch, encodeReply } from 'react-server-dom-webpack/client'

export const callServer = async (id, args) => {
  const fetchPromise = fetch(`/action`, {
    method: "POST",
    headers: { "rsc-action": id },
    body: await encodeReply(args),
  })

  return createFromFetch(fetchPromise)
}


async function hydrate() {
  const response = await fetch('/rsc')
  const rscTree = createFromReadableStream(response.body, { callServer })

  const container = document.getElementById('root')

  const root = createRoot(container)
  root.render(rscTree) 
}

hydrate()
