import { test, expect } from '@playwright/test'
import path from 'path'

test('local API demo should match the visual baseline', async ({ page, browserName }) => {
  test.skip(browserName !== 'chromium', 'Visual baseline is maintained for Chromium')

  const filePath = path.resolve('test-data/api-demo.html')
  await page.goto(`file://${filePath}`)

  await expect(page).toHaveScreenshot('api-demo.png', {
    animations: 'disabled',
  })
})
