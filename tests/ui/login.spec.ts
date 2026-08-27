import { test, expect } from '@playwright/test'
import { LoginPage } from '../../pages/LoginPage'

test.describe('Login Tests', () => {

  test('valid user should be able to login', async ({ page }) => {
    
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.login('standard_user', 'secret_sauce')
    await expect(page).toHaveURL(/inventory/)
  })


  test('invalid user should see login error', async ({ page }) => {

    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.login('invalid_user', 'wrong_password'
    )
    await expect(loginPage.errorMessage).toBeVisible()
  })
})