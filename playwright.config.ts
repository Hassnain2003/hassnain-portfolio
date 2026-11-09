import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? [["github", { announce: "failures" }], ["list"]] : "list",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [
    { name: "chromium", use: devices["Desktop Chrome"] },
  ],
  webServer: {
    command: "npm run start",
    port: 3000,
    timeout: 120000,
    reuseExistingServer: !process.env.CI,
  },
});
