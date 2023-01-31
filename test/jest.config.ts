import type { Config } from "jest"
import { resolve } from "path"

const root = resolve(__dirname, "..");

const config: Config = {
    rootDir: root,
    displayName: "e2e tests",
    testMatch: ["<rootDir>/test/**/*.test.ts"],
    testEnvironment: "node",
    preset: "ts-jest",
    clearMocks: true,
    moduleNameMapper: {
        "@src/(.*)": "<rootDir>/src/$1",
        "@test/(.*)": "<rootDir>/test/$1"
    },
    setupFilesAfterEnv: ["<rootDir>/test/jest.setup.ts"]
}

export default config;