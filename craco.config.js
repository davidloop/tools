const path = require('path');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Find the rule that processes CSS
      const cssRule = webpackConfig.module.rules.find(
        rule => rule.oneOf && Array.isArray(rule.oneOf)
      ).oneOf.find(
        rule => rule.test && rule.test.toString().includes('css')
      );

      if (cssRule) {
        // Add postcss-pxtorem to the PostCSS plugins
        const postCssLoader = cssRule.use.find(
          loader => loader.loader && loader.loader.includes('postcss-loader')
        );

        if (postCssLoader && postCssLoader.options && postCssLoader.options.postcssOptions) {
          if (!postCssLoader.options.postcssOptions.plugins) {
            postCssLoader.options.postcssOptions.plugins = [];
          }
          
          postCssLoader.options.postcssOptions.plugins.push([
            'postcss-pxtorem',
            {
              rootValue: 16,
              propList: ['*'],
              unitPrecision: 5,
              minPixelValue: 1,
              mediaQuery: false,
              replace: true,
              exclude: /node_modules/i,
            }
          ]);
        }
      }

      return webpackConfig;
    },
  },
};
