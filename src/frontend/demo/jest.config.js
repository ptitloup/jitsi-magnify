// import type { Config } from "@jest/types";

module.exports = {
  verbose: true,
  transform: {
    '^.+\\.tsx?$': `ts-jest`,
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sss|styl)$': 'jest-css-modules',
    "@jitsi-magnify/core": `<rootDir>/../magnify/src/index.ts`,
  },
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./jest-setup.ts'],
  moduleDirectories: ['node_modules', 'src'],
};
