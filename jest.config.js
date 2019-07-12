module.exports = {
  verbose: false,
  clearMocks: true,
  coverageDirectory: 'coverage',
  // collectCoverageFrom: [
  //   'packages/**/*.ts',
  //   '!**/*.d.ts',
  // ],
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
  testMatch: [
    '<rootDir>/tests/**/*.test.ts'
  ],
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
