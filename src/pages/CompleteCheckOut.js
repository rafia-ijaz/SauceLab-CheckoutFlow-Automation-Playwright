

// Order success screen.

import { expect } from '@playwright/test';

export class CompleteCheckOut {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.successHeading = this.page.getByRole('heading', { name: 'Thank you for your order!' });
    this.completeText = this.page.locator('.complete-text');
  }

  // Verify that the order was completed successfully
  async assertOrderCompleted() {
    await expect(this.successHeading).toBeVisible();
    await expect(this.completeText).toContainText('Your order has been dispatched');
  }
}
