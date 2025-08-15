// tests/CheckOutFlow.spec.js
import { test } from '@playwright/test';
import { LoginPage } from '../src/pages/Login.js';
import { InventoryPage } from '../src/pages/InventoryPage.js';
import { CartPage } from '../src/pages/CartPage.js';
// Assume your checkout file exports these classes:
import { checkoutOne, CheckoutOne, CheckoutTwo } from '../src/pages/checkoutONE.js';
import { CompleteCheckOut } from '../src/pages/CompleteCheckOut.js';
import { creds, customer } from '../src/fixtures/testData.js';

test.describe('For Happy path checkout flow', () => {
  test('user can add 3 random items and successfully checkout', async ({ page }) => {
    // Instantiate Page Objects (consistent names)
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const stepOne = new checkoutOne(page);
    const stepTwo = new CheckoutTwo(page);
    const completePage = new CompleteCheckOut(page);

    // Step 1: Login
    await test.step('Login', async () => {
      await loginPage.goto();                                   // open URL
      await loginPage.login(creds.username, creds.password);    // fill & submit credentials
      await inventoryPage.assertOnPage();                       // verify inventory is visible
    });

    // Step 2: Add 3 random items
    await test.step('Add 3 random items to cart', async () => {
      await inventoryPage.addRandomItemsToCart(3);              // adds N unique items, checks badge
    });

    // Step 3: Open cart and start checkout
    await test.step('Go to cart and begin checkout', async () => {
      await inventoryPage.openCart();                           // click cart icon
      await cartPage.assertItemsCount(3);                       // verify 3 items present
      await cartPage.proceedToCheckout();                       // click Checkout -> step one
    });

    // Step 4: Fill customer info
    await test.step('Enter customer info and continue', async () => {
      await stepOne.fillCustomerInfo(
        customer.firstName,
        customer.lastName,
        customer.postalCode
      );
      await stepOne.continue();                                 // go to step two
    });

    // Step 5: Review & complete the order
    await test.step('Review order and complete', async () => {
      await stepTwo.assertSummaryPresent(3);                     // ensure summary exists
      await stepTwo.finish();                                   // complete the order -> complete page
    });

    // Step 6: Verify completion
    await test.step('Verify order completion screen', async () => {
      await completePage.assertOrderCompleted();                // "Thank you for your order!" visible
    });
  });
});
