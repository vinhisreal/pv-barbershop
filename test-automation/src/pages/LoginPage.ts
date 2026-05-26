import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * LoginPage đại diện cho trang đăng nhập (Signin) của pv-barbershop.
 * Chứa các locator và methods nghiệp vụ liên quan đến Đăng nhập.
 */
export class LoginPage extends BasePage {
  // Định nghĩa các selector & locators
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly rememberMeCheckbox: Locator;
  private readonly signInButton: Locator;
  private readonly signUpLink: Locator;
  private readonly forgotPasswordLink: Locator;
  
  constructor(page: Page) {
    super(page);
    // Sử dụng thuộc tính ổn định định danh input
    this.emailInput = this.page.locator('input[type="email"]');
    this.passwordInput = this.page.locator('input[type="password"]');
    // Checkbox ghi nhớ
    this.rememberMeCheckbox = this.page.locator('input[type="checkbox"]');
    // Nút đăng nhập (submit button)
    this.signInButton = this.page.locator('button[type="submit"]');
    // Các links điều hướng
    this.signUpLink = this.page.locator('a[href="/signup"]');
    this.forgotPasswordLink = this.page.locator('a[href="/restore-password"]');
  }

  /**
   * Truy cập trang đăng nhập trực tiếp.
   */
  async navigate(): Promise<void> {
    await this.goto('/signin');
  }

  /**
   * Thực hiện quy trình đăng nhập.
   * @param email Địa chỉ email tài khoản
   * @param password Mật khẩu
   * @param rememberMe Có chọn ghi nhớ đăng nhập không
   */
  async login(email: string, password: string, rememberMe = false): Promise<void> {
    await this.fill(this.emailInput, email);
    await this.fill(this.passwordInput, password);
    
    const isChecked = await this.rememberMeCheckbox.isChecked();
    if (rememberMe !== isChecked) {
      // Vì MUI Checkbox bọc ngoài, click vào checkbox input trực tiếp
      await this.rememberMeCheckbox.click({ force: true });
    }
    
    await this.click(this.signInButton);
  }

  /**
   * Xác minh Đăng nhập thành công (chuyển hướng về trang chủ hoặc URL không còn ở /signin).
   */
  async verifyLoginSuccess(): Promise<void> {
    // Chờ cho trang chuyển hướng và kiểm tra URL không chứa '/signin'
    await this.page.waitForURL(url => !url.href.includes('/signin'), { timeout: 10000 });
    const currentUrl = await this.getCurrentUrl();
    expect(currentUrl).not.toContain('/signin');
  }

  /**
   * Xác minh Đăng nhập thất bại bằng cách kiểm tra Toastify message hoặc popup lỗi.
   * @param expectedMessage Thông báo lỗi mong đợi hiển thị
   */
  async verifyLoginFailed(expectedMessage?: string): Promise<void> {
    // Chờ cho Toastify Alert hoặc thông báo lỗi xuất hiện
    const toastBody = this.page.locator('.Toastify__toast-body');
    await expect(toastBody).toBeVisible({ timeout: 5000 });
    
    if (expectedMessage) {
      await expect(toastBody).toContainText(expectedMessage);
    }
  }

  /**
   * Chuyển hướng sang trang đăng ký tài khoản (Signup).
   */
  async clickSignUpLink(): Promise<void> {
    await this.click(this.signUpLink);
    await this.page.waitForURL('**/signup');
  }
}
