module.exports = (api) => {
  api.cache(true);

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          loose: true,
          modules: false,
          useBuiltIns: 'usage',
          corejs: 3,
        },
      ],
      '@babel/preset-typescript',
    ],
    plugins: [
      [
        'babel-plugin-css-modules-transform',
        {
          keepImport: true,
          extractCss: {
            dir: 'lib',
            relativeRoot: 'src',
            filename: '[path]/[name].css'
          },
          prepend: require('./postcss.config.js').plugins,
        }
      ],
    ],
    env: {
      production: {
        ignore: [
          '**/*.test.ts'
        ],
      },
    },
    ignore: ['node_modules'],
  };
};
