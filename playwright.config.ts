import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config({ path: process.env.ENV_FILE || '.env' });

export default defineConfig({
  testDir: './tests',
  globalSetup: './global-setup.ts',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    baseURL: process.env.BASE_URL || 'https://www.saucedemo.com',
    headless: true,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
    ignoreHTTPSErrors: true,
  },

  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium', },
    },

    {
      name: 'firefox',
      use: { browserName: 'firefox', },
    },

    {
      name: 'webkit',
      use: { browserName: 'webkit', },
    },

    {
      name: 'mobile-chrome',
      use: { ...devices['iPhone 17 Pro Max'], },
    },
  ],
});