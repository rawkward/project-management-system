module.exports = {
  testEnvironment: "jsdom",
  setupFiles: ["<rootDir>/jest.env-setup.js"], // ⬅️ добавьте эту строчку
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  transform: {
    "^.+\\.(t|j)sx?$": "babel-jest",
  },
};
