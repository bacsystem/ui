import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  outputDir: '.playwright-artifacts/test-results',
  fullyParallel: true,
  reporter: 'list',
  use: {
    baseURL: 'http://127.0.0.1:3100',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: 'npm run dev -w @bacsystem/demo -- --port 3100',
    url: 'http://127.0.0.1:3100',
    reuseExistingServer: true,
    timeout: 120000,
  },
  projects: [
    {
      name: 'desktop',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1440, height: 1800 },
      },
    },
    {
      name: 'tablet',
      use: {
        ...devices['iPad Pro 11'],
      },
    },
    {
      name: 'mobile',
      use: {
        ...devices['iPhone 13'],
      },
    },
  ],
})