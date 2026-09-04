import { Page, Locator } from '@playwright/test'

export class LoginPage {
  readonly page: Page
  readonly usernameInput: Locator
  readonly passwordInput: Locator
  readonly loginButton: Locator
  readonly errorMessage: Locator
  readonly menuButton: Locator
  readonly logoutLink: Locator

  constructor(page: Page) {
    this.page = page

    this.usernameInput = page.getByPlaceholder('Username')
    this.passwordInput = page.getByPlaceholder('Password')
    this.loginButton = page.getByRole('button', { name: 'Login' })
    this.errorMessage = page.locator('[data-test="error"]')
    this.menuButton = page.getByRole('button', { name: 'Open Menu' })
    this.logoutLink = page.getByRole('link', { name: 'Logout' })
  }

  async goto() {
    await this.page.goto('/')
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username)
    await this.passwordInput.fill(password)
    await this.loginButton.click()
  }

  async logout() {
    await this.menuButton.click()
    await this.logoutLink.click()
  }
}
