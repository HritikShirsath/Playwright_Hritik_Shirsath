import { Page, Locator } from '@playwright/test'

export class CheckoutPage {
  readonly page: Page
  readonly checkoutButton: Locator
  readonly firstNameInput: Locator
  readonly lastNameInput: Locator
  readonly postalCodeInput: Locator
  readonly continueButton: Locator
  readonly errorMessage: Locator
  readonly finishButton: Locator
  readonly confirmationMessage: Locator

  constructor(page: Page) {
    this.page = page

    this.checkoutButton = page.getByRole('button', { name: 'Checkout' })

    this.firstNameInput = page.getByPlaceholder('First Name')
    this.lastNameInput = page.getByPlaceholder('Last Name')
    this.postalCodeInput = page.getByPlaceholder('Zip/Postal Code')

    this.continueButton = page.getByRole('button', { name: 'Continue' })

    this.errorMessage = page.locator('[data-test="error"]')

    this.finishButton = page.getByRole('button', { name: 'Finish' })

    this.confirmationMessage = page.getByText('Thank you for your order!', {
      exact: true,
    })
  }

  async startCheckout() {
    await this.checkoutButton.click()
  }

  async fillCustomerDetails(
    firstName: string,
    lastName: string,
    postalCode: string,
  ) {
    await this.firstNameInput.fill(firstName)
    await this.lastNameInput.fill(lastName)
    await this.postalCodeInput.fill(postalCode)
  }

  async continueCheckout() {
    await this.continueButton.click()
  }

  async finishOrder() {
    await this.finishButton.click()
  }
}
