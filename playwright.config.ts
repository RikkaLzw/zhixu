import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  testMatch: '*.spec.ts',
  timeout: 30_000,
  use: {
    baseURL: 'http://127.0.0.1:8085',
    channel: process.env.PLAYWRIGHT_BROWSER_CHANNEL || undefined,
    viewport: { width: 390, height: 844 },
  },
  webServer: {
    command: 'npm run web -- --port 8085',
    url: 'http://127.0.0.1:8085',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
