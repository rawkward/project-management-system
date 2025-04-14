export default {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  transform: {
    "^.+\\.(t|j)sx?$": "babel-jest",
  },
  transformIgnorePatterns: ["/node_modules/(?!(@dnd-kit|@emotion|@mui)/)"],
};
