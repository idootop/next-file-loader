# Next File Loader

[![NPM Version](https://badgen.net/npm/v/next-file-loader)](https://www.npmjs.com/package/next-file-loader) [![Downloads](https://img.shields.io/npm/dm/next-file-loader.svg)](https://www.npmjs.com/package/next-file-loader) [![Minizipped Size](https://img.shields.io/bundlephobia/minzip/next-file-loader)](https://www.npmjs.com/package/next-file-loader)

A Webpack file loader that simplifies the import of video, audio, and other assets in Next.js applications.

## ⚡️ Installation

```
npm install -D next-file-loader

# or
pnpm install -D next-file-loader

# or
yarn add -D next-file-loader
```

## 🔥 Usage

Here's an example configuration:

```typescript
// next.config.js
const withNextFileLoader = require('next-file-loader')([
  {
    // Video loader
    test: /\.(mp4|webm|mkv|ogg|ogv|wmv|avi|mov|flv|m4v|3gp)$/i,
    outputPath: 'static/videos/[name].[hash:8].[ext]',
  },
  {
    // Audio loader
    test: /\.(mp3|wav|flac|ogg|aac|m4a|wma|ape)$/i,
    outputPath: 'static/audios/[name].[hash:8].[ext]',
  },
  {
    // Custom file content resolution
    test: /\.(rar|zip)$/i,
    outputPath: 'static/other/[name].[hash:8].[ext]',
    resolve: ({ src, content, resourcePath }) => {
      return `export default {
        src: "${src}",
        fileSize: "100KB",
        resourcePath: "${resourcePath}"
      }`;
    },
  },
]);

module.exports = withNextFileLoader({
  // Your existing nextConfig
});
```

Or ESM module:

```typescript
// next.config.mjs
import createNextFileLoader from 'next-file-loader';

const withNextFileLoader = createNextFileLoader([
  // ... your file load rules
]);

export default withNextFileLoader({
  // Your existing nextConfig
});
```

## 📖 License

This project is licensed under the MIT License.
