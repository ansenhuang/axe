module.exports = {
  plugins: [
    require('postcss-advanced-variables'),
    require('postcss-nested'),
    require('postcss-calc')({
      mediaQueries: true,
      selectors: false
    }),
    require('postcss-flexbugs-fixes'),
    require('postcss-preset-env')({
      autoprefixer: {
        flexbox: 'no-2009',
      },
      stage: 3,
    }),
  ],
};
