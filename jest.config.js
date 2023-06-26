module.exports = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  moduleNameMapper: {
    '@root/(.*)': '<rootDir>/src/$1',
    '@pipes/(.*)': '<rootDir>/src/app/shared/pipes/$1',
    '@components/(.*)': '<rootDir>/src/app/shared/components/$1',
    '@directives/(.*)': '<rootDir>/src/app/shared/directives/$1',
    '@pages/(.*)': '<rootDir>/src/app/pages/$1',
    '@utils/(.*)': '<rootDir>/src/app/utils/$1',
    '@app/(.*)': '<rootDir>/src/app/$1',
  }
}
