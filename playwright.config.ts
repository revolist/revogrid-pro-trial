/**
 * Playwright configuration for the Pro Trial smoke tests.
 *
 * The web server block starts the Vite app automatically so a first-time user
 * can run `pnpm test:e2e` without manually starting `pnpm dev`.
 */
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30_000,
  expect: {
    timeout: 10_000,
  },
  fullyParallel: true,
  reporter: [['list']],
  use: {
    baseURL: 'http://127.0.0.1:41738',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'pnpm dev --host 127.0.0.1 --port 41738 --strictPort',
    url: 'http://127.0.0.1:41738',
    reuseExistingServer: false,
    timeout: 60_000,
  },
});
