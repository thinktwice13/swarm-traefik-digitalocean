module.exports = {
  roots: ['<rootDir>'],
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'jsx'],
  testPathIgnorePatterns: ['<rootDir>[/\\\\](node_modules|.next)[/\\\\]'],
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(ts|tsx)$'],
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest',
  },
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__mocks__/fileMock.js',
    '^@lib(.*)$': '<rootDir>/src/lib$1',
    '^@utils(.*)$': '<rootDir>/src/utils$1',
    '^@styles(.*)$': '<rootDir>/src/styles$1',
    '^@pages(.*)$': '<rootDir>/src/pages$1',
    '^@test-utils(.*)$': '<rootDir>/src/utils/test-utils$1',
  },
  setupFilesAfterEnv: ['<rootDir>/src/test/setup.ts'],
};
