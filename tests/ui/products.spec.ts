import { test, expect } from '../../fixtures/test.fixture'
import { ProductsPage } from '../../pages/ProductsPage'

test.describe('Product Tests', () => {
  test('user should be able to add product to cart', async ({
    loggedInPage,
  }) => {
    const productsPage = new ProductsPage(loggedInPage)
    await expect(productsPage.productsTitle).toBeVisible()
    await productsPage.addProductToCart('Sauce Labs Backpack')
    await expect(productsPage.cartBadge).toHaveText('1')
    await productsPage.openCart()
    await expect(
      loggedInPage.getByText('Sauce Labs Backpack', { exact: true }),
    ).toBeVisible()
    await expect(loggedInPage.locator('.cart_item')).toHaveCount(1)
    await productsPage.removeProductFromCart('Sauce Labs Backpack')
    await expect(loggedInPage.locator('.cart_item')).toHaveCount(0)
    await expect(productsPage.cartBadge).toHaveCount(0)
  })
})
