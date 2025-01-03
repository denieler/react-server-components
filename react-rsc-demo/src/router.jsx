import {
  useState,
  use,
} from 'react';
import {createFromFetch} from 'react-server-dom-webpack/client';

const initialCache = new Map();

export function Router() {
  const [cache] = useState(initialCache);

  let content = cache.get('page')
  if (!content) {
    content = createFromFetch(
      fetch('/react')
    )
    cache.set('page', content)
  }

  return (
    <>
      {use(content)}
    </>
  )
}
