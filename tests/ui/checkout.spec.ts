import { test, expect } from '../../fixtures/test.fixture'
import { ProductsPage } from '../../pages/ProductsPage'
import { CheckoutPage } from '../../pages/CheckoutPage'

test.describe('Checkout Tests', () => {

  test('user should be able to complete checkout', async ({
    loggedInPage
  }) => {

    const productsPage = new ProductsPage(loggedInPage)
    const checkoutPage = new CheckoutPage(loggedInPage)

    await productsPage.addProductToCart('Sauce Labs Backpack')
    await productsPage.openCart()
    await checkoutPage.startCheckout()
    await checkoutPage.fillCustomerDetails('John', 'Doe', '380001')
    await checkoutPage.continueCheckout()
    await expect(loggedInPage.getByText('Checkout: Overview', { exact: true })).toBeVisible()
    await checkoutPage.finishOrder()
    await expect(checkoutPage.confirmationMessage).toBeVisible()
  })


  test('checkout should show validation error when required information is missing', async ({
    loggedInPage
  }) => {

    const productsPage = new ProductsPage(loggedInPage)
    const checkoutPage = new CheckoutPage(loggedInPage)

    await productsPage.addProductToCart('Sauce Labs Backpack')
    await productsPage.openCart()
    await checkoutPage.startCheckout()
    await checkoutPage.continueCheckout()
    await expect(checkoutPage.errorMessage).toBeVisible()
  })
})