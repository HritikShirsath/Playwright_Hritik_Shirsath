import { defineConfig, devices } from '@playwright/test'
import dotenv from 'dotenv'

dotenv.config({ path: process.env.ENV_FILE || '.env' })

const firefoxLaunchOptions =
  process.platform === 'win32'
    ? {
        // Some Windows environments block Firefox's sandboxed content subprocesses.
        // Apply this local compatibility workaround only to the Firefox project.
        env: {
          ...process.env,
          MOZ_DISABLE_CONTENT_SANDBOX: '1',
          MOZ_DISABLE_GPU_SANDBOX: '1',
        },
      }
    : undefined

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html'], ['allure-playwright']],

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
      testMatch: 'ui/**/*.spec.ts',
      use: {
        browserName: 'chromium',
        viewport: { width: 1280, height: 720 },
        colorScheme: 'light',
      },
    },

    {
      name: 'firefox',
      testMatch: 'ui/**/*.spec.ts',
      testIgnore: '**/visual.spec.ts',
      use: { browserName: 'firefox', launchOptions: firefoxLaunchOptions },
    },

    {
      name: 'webkit',
      testMatch: 'ui/**/*.spec.ts',
      testIgnore: '**/visual.spec.ts',
      use: { browserName: 'webkit' },
    },

    {
      name: 'mobile-chrome',
      testMatch: 'ui/**/*.spec.ts',
      testIgnore: '**/visual.spec.ts',
      use: { ...devices['iPhone 17 Pro Max'] },
    },
    {
      name: 'api',
      testMatch: 'api/**/*.spec.ts',
      use: { browserName: 'chromium' },
    },
  ],
})
