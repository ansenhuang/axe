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
