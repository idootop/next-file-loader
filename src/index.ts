import type { NextFileLoaderRule } from './config';
import { getLoaderPath, nextRuntime2CompilerType } from './utils';

const withNextFileLoader =
  (rules: NextFileLoaderRule[] = []) =>
  (nextConfig: any = {}) => {
    return Object.assign({}, nextConfig, {
      webpack(config: any, options: any) {
        if (!options.defaultLoaders) {
          throw new Error(
            'This plugin is not compatible with Next.js versions below 5.0.0 https://err.sh/next-plugins/upgrade',
          );
        }

        for (const rule of rules) {
          const { test, outputPath, resolve } = rule;
          config.module.rules.push({
            test,
            loader: getLoaderPath(),
            issuer: { not: /\.(css|scss|sass)$/ },
            dependency: { not: ['url'] },
            resourceQuery: {
              not: [
                new RegExp('__next_metadata__'),
                new RegExp('__next_metadata_route__'),
                new RegExp('__next_metadata_image_meta__'),
              ],
            },
            options: {
              resolve,
              outputPath,
              isDev: options.dev,
              basePath: config.basePath,
              assetPrefix: config.assetPrefix,
              compilerType: nextRuntime2CompilerType(options.nextRuntime),
            },
          });
        }

        if (typeof nextConfig.webpack === 'function') {
          return nextConfig.webpack(config, options);
        }

        return config;
      },
    });
  };

export default withNextFileLoader;
