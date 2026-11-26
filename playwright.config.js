// @ts-check
import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
  testDir: "./tests",
  timeout: 30 * 1000,
  expect: {
    timeout: 12000,
  },
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    actionTimeout: 10000,
    navigationTimeout: 30000,
    browserName: "chromium",
    headless: true,
    trace: "on",
  },
});
