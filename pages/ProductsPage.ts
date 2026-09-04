import { Page, Locator } from '@playwright/test'

export class ProductsPage {
  readonly page: Page
  readonly productsTitle: Locator
  readonly shoppingCart: Locator
  readonly cartBadge: Locator

  constructor(page: Page) {
    this.page = page

    this.productsTitle = page.getByText('Products', { exact: true })
    this.shoppingCart = page.locator('.shopping_cart_link')
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]')
  }

  getProduct(productName: string) {
    return this.page.locator('.inventory_item').filter({ hasText: productName })
  }

  async addProductToCart(productName: string) {
    const product = this.getProduct(productName)
    await product.getByRole('button', { name: 'Add to cart' }).click()
  }

  async openCart() {
    await this.shoppingCart.click()
  }

  async removeProductFromCart(productName: string) {
    await this.page
      .locator('.cart_item')
      .filter({ hasText: productName })
      .getByRole('button', { name: 'Remove' })
      .click()
  }
}
