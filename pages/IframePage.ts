import { Page, Locator } from '@playwright/test'

export class IframePage {
  readonly page: Page;
  readonly frame: ReturnType<Page['frameLocator']>
  readonly messageInput: Locator
  readonly submitButton: Locator
  readonly result: Locator

  constructor(page: Page) {
    this.page = page

    this.frame = page.frameLocator('#test-frame')

    this.messageInput = this.frame.getByLabel('Message')
    this.submitButton = this.frame.getByRole('button', {
      name: 'Submit',
    })
    this.result = this.frame.locator('#result')
  }

  async enterMessage(message: string) {
    await this.messageInput.fill(message)
  }

  async submit() {
    await this.submitButton.click()
  }
}