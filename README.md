# SauceLab Checkout Flow Automation - Playwright

This repository contains automated end-to-end tests for the **Sauce Labs** checkout flow using [Playwright](https://playwright.dev/).

---

## 📂 Project Structure
src/
pages/ # Page Object Models
fixtures/ # Test data and environment variables
tests/ # Test specifications
playwright.config.js
.env # Environment variables (not committed to GitHub)

---

## 🚀 Setup & Installation

### 1️⃣ Clone the repository

git clone https://github.com/rafia-ijaz/SauceLab-CheckoutFlow-Automation-Playwright.git
cd SauceLab-CheckoutFlow-Automation-Playwright

### 2️⃣ Install dependencies
    npm install

### 3️⃣ Install Playwright browsers
npx playwright install

### 4️⃣ Configure environment variables
Create a .env file in the root directory:env

BASE_URL=https://www.saucedemo.com
USERNAME=standard_user
PASSWORD=secret_sauce
FIRST_NAME=Rafia
LAST_NAME=Ejaz
POSTAL_CODE=54000

### 🧪 Running Tests
Run all tests in headless mode:

npx playwright test
Run tests in headed (UI) mode:

npx playwright test --headed
Run a specific test file:

npx playwright test tests/CheckOutFlow.spec.js

### 📊 Viewing Test Reports
After running tests, open the HTML report:
npx playwright show-report


### ⚙️ CI/CD with GitHub Actions
This project includes a GitHub Actions workflow (.github/workflows/playwright.yml) to:

Run tests on push or pull requests to main / master

Upload Playwright HTML reports as artifacts for 30 days

### 📐 Test Case Flow Diagram
flowchart TD
    A[Login Page] --> B[Inventory Page]
    B --> C[Add 3 Random Items to Cart]
    C --> D[Cart Page]
    D --> E[Checkout Step One - Customer Info]
    E --> F[Checkout Step Two - Order Summary]
    F --> G[Finish Checkout]
    G --> H[Order Completion Page]

### 📦 Dependencies
Node.js (LTS recommended)

Playwright

dotenv (for environment variables)

### 👩‍💻 Author
Rafia Ijaz
QA Automation Engineer
GitHub: rafia-ijaz
