import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  timeout: 1800000,
  expect: {
    timeout: 10000,
  },
  use: {},
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
