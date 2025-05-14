module.exports = {
  plugins: [
    require('postcss-pxtorem')({
      rootValue: 16,
      propList: ['*'],
      unitPrecision: 5,
      minPixelValue: 1,
      mediaQuery: false,
      replace: true,
      exclude: /node_modules/i,
    }),
  ],
};
