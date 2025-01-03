# React Server Components Experiments

This repository contains experimental implementations of React Server Components (RSC) without using any frameworks like Next.js or Remix. The goal is to understand the underlying mechanics of RSC and server-side rendering in React.

## Project Structure

The repository contains three main demo projects:

- `react-rsc-demo/`: Version of demo implementation of React Server Components with webpack and express from React team
- `rsc-demo/`: Simplified implementation of React Server Components
- `ssr-demo/`: Server-Side Rendering implementation

## Requirements

- Node.js (Latest LTS version recommended)
- npm/yarn

## Getting Started

### React Server Components Demo

```bash
cd rsc-demo
npm install
npm run build
npm run run:server
```

This demo uses:
- React 19.0.0
- Express.js
- Webpack 5
- React Server DOM Webpack

## Project Goals

1. Demonstrate raw implementation of React Server Components
2. Understand the differences between RSC and traditional SSR
3. Explore webpack configuration for RSC
4. Implement server-client communication without framework abstractions

## Contributing

Feel free to experiment with the code and submit pull requests. This is an educational project aimed at understanding React Server Components.

## License

MIT

## Note

This is an experimental project and not intended for production use. For production applications, please use established frameworks like Next.js or Remix that provide battle-tested RSC implementations.