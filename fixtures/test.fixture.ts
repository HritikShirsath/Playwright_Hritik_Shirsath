import {test as base, expect, Page} from '@playwright/test'
import { LoginPage } from '../pages/LoginPage';

type TestFixtures = {
  loggedInPage: Page
}

export const test = base.extend<TestFixtures>({
  loggedInPage: async ({ page }, use) => {

    const loginPage = new LoginPage(page)

    await loginPage.goto()

    await loginPage.login(
      process.env.SAUCE_USERNAME!,
      process.env.SAUCE_PASSWORD!
    )

    await use(page);
  },
})

export { expect }