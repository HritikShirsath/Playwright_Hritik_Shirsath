import { Page, Locator } from '@playwright/test'

export class ProductsPage {
  readonly page: Page
  readonly productsTitle: Locator
  readonly shoppingCart: Locator

  constructor(page: Page) {
    this.page = page

    this.productsTitle = page.getByText('Products', { exact: true })
    this.shoppingCart = page.locator('.shopping_cart_link')
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
}