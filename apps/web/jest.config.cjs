// my-monorepo/apps/web/jest.config.cjs

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterFramework: ['@testing-library/jest-dom'],
  testMatch: ['**/*.test.{ts,tsx}'],
  moduleNameMapper: {
    '^@repo/ui$':
      '<rootDir>/../../packages/ui/src/index.ts',
    '^@repo/design-tokens$':
      '<rootDir>/../../packages/design-tokens/src/index.ts',
    '^@/(.*)$': '<rootDir>/src/$1',
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
    '!src/main.tsx',
  ],
}