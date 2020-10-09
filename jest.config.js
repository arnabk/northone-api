module.exports = {
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  "testMatch": [
    "**/__tests__/**/*.test.ts",
  ],
  "moduleFileExtensions": [
    "ts",
    "js",
    "json",
    "node"
  ],
  "collectCoverageFrom": [
    "<rootDir>/src/**/*.{ts,js}",
    "!<rootDir>/node_modules/",
    "!<rootDir>/**/__applicationMocks__/**",
    "!<rootDir>/src/**/*.d.ts"
  ],
  "testEnvironment": "node",
  "coverageReporters": [
    "json-summary",
    "text",
    "lcov"
  ],
  "moduleNameMapper": {
    "^@root/(.*)$": "<rootDir>/src/$1"
  },
  "coverageThreshold": {
    "global": {
      "branches": 85,
      "functions": 85,
      "lines": 85,
      "statements": 85,
    }
  },
  "automock": false,
  "setupFilesAfterEnv": ["./src/setupTests.ts"],
  "modulePathIgnorePatterns": ["<rootDir>/.*/__mocks__"]
};
