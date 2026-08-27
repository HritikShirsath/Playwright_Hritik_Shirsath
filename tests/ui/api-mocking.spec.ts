import { test, expect } from '@playwright/test'
import path from 'path'

test('should mock API response', async ({ page }) => {

  await page.route(
    'https://jsonplaceholder.typicode.com/users/1',
    async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          id: 1,
          name: 'Mock User',
          email: 'mock@example.com',
        }),
      })
    }
  )

  const filePath = path.resolve('test-data/api-demo.html')

  await page.goto(`file://${filePath}`)

  await page.getByRole('button', { name: 'Load User' }).click()

  await expect(page.locator('#user-name'))
    .toHaveText('Mock User')
})