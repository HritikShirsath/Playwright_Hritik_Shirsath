import { test as base, expect, Page } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { sauceCredentials } from '../utils/credentials'

type TestFixtures = {
  loggedInPage: Page
}

export const test = base.extend<TestFixtures>({
  loggedInPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page)

    await loginPage.goto()

    const { username, password } = sauceCredentials()
    await loginPage.login(username, password)

    await use(page)
  },
})

export { expect }
