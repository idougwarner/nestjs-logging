// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  testMatch: ['**/*.+(test|spec).ts'],

  testEnvironment: "node",

  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "json"
  ],

  // A map from regular expressions to paths to transformers
  transform: {
    "\\.(ts)$": "ts-jest"
  },
  
  coverageDirectory: "coverage",
  collectCoverageFrom: ["./src/**/*.ts"],

  rootDir: ".",

};
