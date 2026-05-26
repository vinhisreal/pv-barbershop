import { test as baseTest } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { SignupPage } from '../pages/SignupPage';

// Khai báo các custom fixtures
type MyFixtures = {
  loginPage: LoginPage;
  signupPage: SignupPage;
};

// Mở rộng base test của Playwright để tự động khởi tạo Page Objects
export const test = baseTest.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  signupPage: async ({ page }, use) => {
    const signupPage = new SignupPage(page);
    await use(signupPage);
  },
});

export { expect } from '@playwright/test';
