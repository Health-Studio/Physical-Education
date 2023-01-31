import type { Config } from "jest"
import { resolve } from "path"

const root = resolve(__dirname);
const config: Config = {
    rootDir: root,
    displayName: "unit tests",
    testMatch: ["<rootDir>/src/**/*.test.ts"],
    testEnvironment: "node",
    preset: "ts-jest",
    clearMocks: true,
    moduleNameMapper: {
        "@src/(.*)": "<rootDir>/src/$1",
        "@test/(.*)": "<rootDir>/test/$1"
    },
    collectCoverage: true,
    coverageReporters: ["text", "cobertura"]
}

export default config;