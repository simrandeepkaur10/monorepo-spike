// my-monorepo/packages/ui/jest.config.cjs

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterFramework: ['@testing-library/jest-dom'],
  testMatch: ['**/*.test.{ts,tsx}'],
  moduleNameMapper: {
    '^@repo/design-tokens$':
      '<rootDir>/../design-tokens/src/index.ts',
  },
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      { tsconfig: { jsx: 'react-jsx' } },
    ],
  },
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/index.ts',
  ],
}