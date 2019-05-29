module.exports = (api) => {
  api.cache(true);

  return {
    presets: [
      [
        '@babel/env',
        {
          targets: {
            browsers: [
              '>1%',
              'last 4 versions',
              'Firefox ESR',
              'not ie < 11'
            ],
            node: '8.9',
          },
        },
      ],
      '@babel/preset-typescript',
    ],
    env: {
      production: {
        ignore: [
          '**/*.test.ts',
          '__tests__',
        ],
      },
    },
    ignore: ['node_modules'],
  };
};
