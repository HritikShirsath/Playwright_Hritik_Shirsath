import { test, expect } from '@playwright/test'
import path from 'path'
import { IframePage } from '../../pages/IframePage'

test('user should be able to interact with iframe', async ({ page }) => {
  const iframePage = new IframePage(page)
  const filePath = path.resolve('test-data/iframe.html')
  await page.goto(`file://${filePath}`)
  await iframePage.enterMessage('Playwright iframe test')
  await iframePage.submit()
  await expect(iframePage.result).toHaveText('Playwright iframe test')
})
