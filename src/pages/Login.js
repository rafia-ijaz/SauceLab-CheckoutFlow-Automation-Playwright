
import { expect } from '@playwright/test';

export class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Define locators for the login form elements
    this.usernameInput = this.page.getByPlaceholder('Username');
    this.passwordInput = this.page.getByPlaceholder('Password');
    this.loginBtn = this.page.getByRole('button', { name: 'Login' });
  }

  // Navigate to base url to ensure login form is visible
  async goto() {
    await this.page.goto('/');
    await expect(this.loginBtn).toBeVisible();
  }

  // Fill out credentials and submit and verifies if we ended up on the inventory page.
  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginBtn.click();
    await expect(this.page).toHaveURL(/inventory\.html/);
  }
}
