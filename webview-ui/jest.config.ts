import type { Config } from "@jest/types";


const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testMatch: ["<rootDir>/src/**/__tests__/**/*.test.tsx", "<rootDir>/src/**/?(*.)+(spec|test).tsx"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
  },
  coverageDirectory: "<rootDir>/coverage",
  collectCoverageFrom: ["src/**/*.{ts,tsx,js,jsx}", "!src/**/*.d.ts"],
};

export default config;
