module.exports = {
  ignore: [
    'node_modules',
    'packages/**/lib',
    '**/*.test.ts',
    '**/*.d.ts',
  ],
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
  env: {
    library: {
      plugins: [
        [
          'babel-plugin-css-modules-transform',
          {
            keepImport: true,
            generateScopedName: '[local]___[hash:base64:5]',
            extractCss: {
              dir: 'lib',
              relativeRoot: 'src',
              filename: '[path]/[name].css'
            },
            prepend: require('./postcss.config.js').plugins,
          }
        ],
      ],
    },
  },
};
