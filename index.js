module.exports = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      const { isServer } = options;

      if (!options.defaultLoaders) {
        throw new Error(
          'This plugin is not compatible with Next.js versions below 5.0.0 https://err.sh/next-plugins/upgrade'
        );
      }

      const assetPrefix = nextConfig.assetPrefix || '';

      const enableSvg = nextConfig.enableSvg || false;

      const limit = nextConfig.inlineFontLimit || 8192;

      // let testPattern = /\.(woff(2)?|eot|ttf|otf)(\?v=\d+\.\d+\.\d+)$/;
      let testPattern = /\.(woff(2)?|eot|ttf|otf)(\?v=\d+\.\d+\.\d+)?$/;

      if (enableSvg) testPattern = /\.(woff(2)?|eot|ttf|otf|svg)(\?v=\d+\.\d+\.\d+)?$/;

      config.module.rules.push({
        test: testPattern,
        issuer: {
          // Next.js already handles url() in css/sass/scss files
          test: /\.\w+(?<!(s?c|sa)ss)$/i,
        },
        use: [
          {
            loader: require.resolve('url-loader'),
            options: {
              limit,
              fallback: require.resolve('file-loader'),
              publicPath: `${assetPrefix}/_next/static/chunks/fonts/`,
              outputPath: `${isServer ? "../" : ""}static/chunks/fonts/`,
              name: '[name]-[hash].[ext]'
            }
          }
        ]
      });

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options);
      }

      return config;
    }
  });
};
