import { join } from 'node:path';

// @ts-ignore
import loaderUtils from 'next/dist/compiled/loader-utils3';

import { NextFileLoaderRule } from './config';

function nextFileLoader(this: any, content: Buffer) {
  const { compilerType, isDev, basePath, assetPrefix, ...rule } =
    this.getOptions();
  const {
    outputPath = 'static/assets/[name].[hash:8].[ext]',
    resolve = ({ src }) => {
      const stringifiedData = JSON.stringify({ src });
      return `export default ${stringifiedData};`;
    },
  } = rule as NextFileLoaderRule;
  const context = this.rootContext;
  const opts = { context, content };
  const interpolatedName = loaderUtils.interpolateName(this, outputPath, opts);
  if (compilerType === 'client') {
    this.emitFile(interpolatedName, content, null);
  } else {
    this.emitFile(
      join(
        '..',
        isDev || compilerType === 'edge-server' ? '' : '..',
        interpolatedName,
      ),
      content,
      null,
    );
  }
  const prefix = (basePath || assetPrefix || '') + '/_next/';
  const src = prefix + interpolatedName;
  return resolve({
    src,
    content,
    resourcePath: this.resourcePath,
  });
}

export const raw = true;
export default nextFileLoader;
