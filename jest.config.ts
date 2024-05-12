import type { Config } from 'jest';

export default (): Config => ({
  automock: false,
  clearMocks: true,
  // cacheDirectory: `${__dirname}/temp`,
  collectCoverageFrom: [
    'packages/*/src/*.{cjs,js,jsx,mjs,ts,tsx}',
    '**/*.{cjs,js,jsx,mjs,ts,tsx}',
    '!**/node_modules/**',
    '!**/scripts/**',
    '!**/vendor/**',
  ],
  coverageDirectory: `${__dirname}/coverage`,
  coveragePathIgnorePatterns: [
    '<rootDir>/bin',
    '<rootDir>/config',
    '<rootDir>/node_modules',
    '<rootDir>/scripts',
    '<rootDir>/temp',
  ],
  coverageReporters: ['json', 'text', 'lcov', 'clover'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  detectLeaks: true,
  detectOpenHandles: true,
  maxWorkers: '50%',
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'cjs',
    'cts',
    'mjs',
    'mts',
    'node',
  ],
  modulePathIgnorePatterns: [
    '<rootDir>/apps/*/dist',
    '<rootDir>/packages/*/dist',
  ],
  preset: 'ts-jest',
  resetMocks: true,
  restoreMocks: true,
  roots: [
    '<rootDir>/apps',
    '<rootDir>/bin',
    '<rootDir>/packages',
    '<rootDir>/tests',
  ],
  setupFiles: [],
  setupFilesAfterEnv: [],
  testEnvironment: 'node',
  testRegex: ['./(src|tests)/.*\\.(spec|test)?\\.(ts|tsx)$'],
  testTimeout: 30000,
  transform: {
    '^.+\\.(cts|mts|ts|tsx)?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.test.json',
      },
    ],
  },
  transformIgnorePatterns: [
    '<rootDir>/bin',
    '<rootDir>/config',
    '<rootDir>/node_modules',
    '<rootDir>/scripts',
    '<rootDir>/temp',
  ],
  watchPathIgnorePatterns: ['<rootDir>/packages/**/temp', '<rootDir>/temp'],
  watchPlugins: [],
  verbose: true,
});
