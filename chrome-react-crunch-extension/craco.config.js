module.exports = {
    webpack: {
      configure: (webpackConfig, {env, paths}) => {
        return {
          ...webpackConfig,
          resolve: {
              extensions: ['.ts', '.tsx', '.js', '.json']
          },
          entry: {
            main: [env === 'development' &&
            require.resolve('react-dev-utils/webpackHotDevClient'),paths.appIndexJs].filter(Boolean),
            content: './src/chromeServices/DOMEvaluator.ts',
          },
          output: {
            ...webpackConfig.output,
            filename: 'static/js/[name].js',
          },
          optimization: {
            ...webpackConfig.optimization,
            runtimeChunk: false,
          }
        }
      },
    }
  }