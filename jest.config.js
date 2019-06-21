module.exports = {
  clearMocks: true,
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
  roots: ['<rootDir>tests'],
  testMatch: ['**/*.test.ts'],
  moduleFileExtensions: ['ts', 'js'],
  modulePathIgnorePatterns: [],
  moduleNameMapper: {
    '@axe/(.+)$': '<rootDir>packages/$1/src',
    '\\.css$': '<rootDir>/config/jest/cssMapper.js',
  },
  transform: {
    '^.+\\.ts$': 'ts-jest',
    "^(?!.*\\.(ts|js|css|json)$)": "<rootDir>/config/jest/fileTransform.js"
  },
};
