import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

export const isCJSModule = () => {
  return typeof __dirname === 'string';
};

export const getLoaderPath = () => {
  const isCJS = isCJSModule();
  const scriptDir = isCJS ? __dirname : dirname(fileURLToPath(import.meta.url));
  const script = isCJS ? 'next-file-loader.cjs' : 'next-file-loader.js';
  return join(scriptDir, script);
};

export const nextRuntime2CompilerType = (runtime: string) => {
  return runtime === 'edge'
    ? 'edge-server'
    : runtime === 'nodejs'
      ? 'server'
      : 'client';
};
