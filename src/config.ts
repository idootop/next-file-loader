export interface NextFileLoaderRule {
  /**
   * Matches modules based on the provided test assertion.
   *
   * Example: `/\.(mp3|mp4)$/i`
   */
  test: string | RegExp;
  /**
   * Specifies the output path relative to '/_next/' where the asset will be emitted.
   *
   * Example: `static/media/[name].[hash:8].[ext]`
   */
  outputPath?: string;
  /**
   * Customizes the content of the file after applying the loader, allowing additional modifications such as adding size information.
   *
   * Example:
   * ```typescript
   * {
   *  // Custom file content resolution
   *  test: /\.(rar|zip)$/i,
   *  outputPath: 'static/other/[name].[hash:8].[ext]',
   *  resolve: ({ src, content, resourcePath }) => {
   *    return `export default {
   *      src: "${src}",
   *      fileSize: "100KB",
   *      resourcePath: "${resourcePath}"
   *    }`;
   *  },
   * }
   * ```
   */
  resolve?: (data: {
    src: string;
    content: Buffer;
    resourcePath: string;
  }) => string | Promise<string>;
}
