// src/pages/CartPage.js
// Cart screen: verify items and proceed to checkout.

import { expect } from '@playwright/test';

export class CartPage {
  /**
   * @param {import('@playwright/test').Page} page
   */

  // Define locators for cart elements
  constructor(page) {
    this.page = page;
    this.cartItems = this.page.locator('.cart_item');
    this.checkoutBtn = this.page.getByRole('button', { name: 'Checkout' });

  }

  // Verify THE number of items currently in cart
  async assertItemsCount(expected) {
    await expect(this.cartItems).toHaveCount(expected);
  }

  // Click checkout and then verify navigation to step one
  async proceedToCheckout() {
    await expect(this.checkoutBtn).toBeVisible();
    await this.checkoutBtn.click();
    await expect(this.page).toHaveURL(/checkout-step-one\.html/);
  }
}
