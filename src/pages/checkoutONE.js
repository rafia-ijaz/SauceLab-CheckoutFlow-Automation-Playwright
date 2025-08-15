
// fill info (step one) 

import { expect } from '@playwright/test';

export class checkoutOne {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.firstName = this.page.getByPlaceholder('First Name');
    this.lastName  = this.page.getByPlaceholder('Last Name');
    this.postal    = this.page.getByPlaceholder('Zip/Postal Code');
    this.continueBtn = this.page.getByRole('button', { name: 'Continue' });
  }

  // Fill out the customer info form
  async fillCustomerInfo(firstName, lastName, postalCode) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.postal.fill(postalCode);
  }

  // Form here continue to step number two
  async continue() {
    await this.continueBtn.click();
    await expect(this.page).toHaveURL(/checkout-step-two\.html/);
  }
}


export class CheckoutTwo {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;
    this.summary   = page.locator('.summary_info');
    this.items     = page.locator('.cart_item');        //  define items locator
    this.finishBtn = page.getByRole('button', { name: 'Finish' });
  }

  // Verify order summary is visible and the expected number of items are listed
  async assertSummaryPresent(expectedCount = 3) {
    await expect(this.summary).toBeVisible();
    await expect(this.items).toHaveCount(expectedCount); // assert on a Locator
    
  }

  async finish() {
    await this.finishBtn.click();
    await expect(this.page).toHaveURL(/checkout-complete\.html/);
  }
}

