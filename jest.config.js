module.exports = {
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx'],
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{ts,js}',
    '!**/node_modules/**',
    '!**/dist/**',
    '!**/coverage/**',
  ],
  transform: {
    '\\.ts$': '<rootDir>/node_modules/ts-jest/preprocessor.js',
  },
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  coverageReporters: ['text', 'text-summary', 'html'],
  coverageDirectory: '<rootDir>/coverage/',
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(js|ts)x?$',
  testPathIgnorePatterns: ['/node_modules/', '/build/', '/coverage/'],
};
