module.exports = {
  verbose: true,
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
  moduleFileExtensions: ['ts', 'js'],
  modulePathIgnorePatterns: [],
  moduleNameMapper: {
    '@axe/(.+)$': '<rootDir>packages/$1/src',
  },
  roots: ['<rootDir>tests'],
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
    "^.+\\.css$": "<rootDir>/config/jest/cssTransform.js",
    "^(?!.*\\.(ts|js|css|json)$)": "<rootDir>/config/jest/fileTransform.js"
  },
};
