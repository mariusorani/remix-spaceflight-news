import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/tests/setup.ts"],
  moduleNameMapper: {
    "^~/(.*)$": "<rootDir>/app/$1",
    "^../../styled-system/jsx$": "<rootDir>/styled-system/jsx",
    "^../../styled-system/jsx/(.*)$": "<rootDir>/styled-system/jsx/$1",
  },
  transform: {
    "^.+\\.(ts|tsx|js|jsx|mjs)$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.spec.json",
        useESM: true,
      },
    ],
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "mjs"],
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  transformIgnorePatterns: [
    "node_modules/(?!(@remix-run|@web3-storage|@radix-ui|@testing-library)/.*)",
  ],
  testMatch: ["<rootDir>/tests/**/*.{spec,test}.{ts,tsx}"],
  moduleDirectories: ["node_modules", "<rootDir>"],
  testEnvironmentOptions: {
    customExportConditions: ["node", "node-addons"],
  },
};

export default config;
