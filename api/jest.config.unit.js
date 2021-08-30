module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['src'],
  moduleNameMapper: {
    '@utils/(.*)': '<rootDir>/src/utils/$1',
    '@lib/(.*)': '<rootDir>/src/lib/$1',
    '@test/(.*)': '<rootDir>/src/test/$1',
    '@app/(.*)': '<rootDir>/src/app/$1',
  },
  moduleDirectories: ['node_modules', 'src'],
}
