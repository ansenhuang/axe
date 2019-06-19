module.exports = {
  ignore: [
    'node_modules',
    'packages/**/lib',
    'packages/**/unpkg',
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
};
