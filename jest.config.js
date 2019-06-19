module.exports = {
  clearMocks: true,
  verbose: true,
  coverageDirectory: 'coverage',
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  globals: {
    'ts-jest': {
      extends: './babel.config.js',
    },
  },
  moduleFileExtensions: ['ts', 'js'],
  modulePathIgnorePatterns: ['lib', 'unpkg'],
  moduleNameMapper: {
    '@axe/(.+)$': '<rootDir>packages/$1/src',
  },
  notify: false,
  notifyMode: 'always',
  roots: ['<rootDir>packages'],
  testMatch: ['**/__tests__/*.+(ts|js)', '**/*.test.+(ts|js)'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
};
