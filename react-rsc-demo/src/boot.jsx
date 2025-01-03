import { createRoot } from 'react-dom/client'

import { Router } from './router.jsx'

const root = createRoot(document.getElementById('root'))
root.render(<Root />)

function Root() {
  return (
    <Router />
  )
}