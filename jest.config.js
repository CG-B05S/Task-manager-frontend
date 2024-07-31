module.exports = {
    transform: {
      "^.+\\.jsx?$": "babel-jest"
    },
    moduleNameMapper: {
      '\\.(css|less)$': 'identity-obj-proxy',
    },
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/setupTests.js']
  };
  