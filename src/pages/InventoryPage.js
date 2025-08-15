

import { expect } from '@playwright/test';

import { pickNUniqueRandomIndices } from '../utils/random.js';

export class InventoryPage {
  /**
   * @param {import('@playwright/test').Page} page
   */

  // Define locators for inventory items and cart elements
  constructor(page) {
    this.page = page;
    this.inventoryItems = this.page.locator('.inventory_item');
    this.cartBadge = this.page.locator('.shopping_cart_badge');
    this.cartLink = this.page.locator('.shopping_cart_link');
  }

  // Verify if we are on the inventory page and the items exist
  async assertOnPage() {
    await expect(this.page).toHaveURL(/inventory\.html/);
    await expect(this.inventoryItems.first()).toBeVisible();
  }

  // Add N random items to cart and verify that the 'Remove' button appears and badge count == N
  async addRandomItemsToCart(n) {
    const count = await this.inventoryItems.count();
    if (count < n) throw new Error(`Only ${count} items on page, cannot pick ${n}`);

    const picks = pickNUniqueRandomIndices(count, n);

    for (const idx of picks) {
      const item = this.inventoryItems.nth(idx);
      const name = await item.locator('.inventory_item_name').innerText();
      const price = await item.locator('.inventory_item_price').innerText();

      // Click on "Add to cart"
      await item.getByRole('button', { name: /Add to cart/i }).click();

      // Button should be toggled to "Remove" to confirm we actually added the item
      await expect(item.getByRole('button', { name: /Remove/i })).toBeVisible();

      // this is optional btw to debug log visible in trace
      console.log(`Added: ${name} (${price})`);
    }

    // to verify that the cart badge should match the number of items we just added
    await expect(this.cartBadge).toHaveText(String(n));
  }

  // Go to the cart page
  async openCart() {
    await this.cartLink.click();
    await expect(this.page).toHaveURL(/cart\.html/);
  }
}
