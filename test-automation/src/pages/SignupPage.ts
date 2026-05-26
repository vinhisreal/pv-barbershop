import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * SignupPage đại diện cho trang đăng ký (Signup) của pv-barbershop.
 * Chứa các locator và methods nghiệp vụ liên quan đến Đăng ký và Xác thực OTP.
 */
export class SignupPage extends BasePage {
  // Định nghĩa các selector & locators
  private readonly nameInput: Locator;
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly rememberMeCheckbox: Locator;
  private readonly signUpButton: Locator;
  private readonly signInLink: Locator;

  // OTP Modal elements
  private readonly otpModal: Locator;
  private readonly otpInput: Locator;
  private readonly confirmOtpButton: Locator;

  constructor(page: Page) {
    super(page);
    this.nameInput = this.page.locator('input[type="text"]').first();
    this.emailInput = this.page.locator('input[type="email"]');
    this.passwordInput = this.page.locator('input[type="password"]');
    this.rememberMeCheckbox = this.page.locator('input[type="checkbox"]');
    this.signUpButton = this.page.locator('button[type="submit"]');
    this.signInLink = this.page.locator('a[href="/signin"]');

    // OTP Modal
    this.otpModal = this.page.locator('.MuiModal-root'); // Hoặc container có class otp-modal
    this.otpInput = this.page.locator('.MuiModal-root input[type="text"]');
    this.confirmOtpButton = this.page.locator('.MuiModal-root button');
  }

  /**
   * Truy cập trang đăng ký trực tiếp.
   */
  async navigate(): Promise<void> {
    await this.goto('/signup');
  }

  /**
   * Điền thông tin đăng ký và submit để yêu cầu OTP.
   */
  async submitSignupForm(name: string, email: string, password: string, rememberMe = false): Promise<void> {
    await this.fill(this.nameInput, name);
    await this.fill(this.emailInput, email);
    await this.fill(this.passwordInput, password);

    const isChecked = await this.rememberMeCheckbox.isChecked();
    if (rememberMe !== isChecked) {
      await this.rememberMeCheckbox.click({ force: true });
    }

    await this.click(this.signUpButton);
  }

  /**
   * Xác minh Modal nhập mã OTP đã hiển thị thành công.
   */
  async verifyOtpModalVisible(): Promise<void> {
    await expect(this.otpInput).toBeVisible({ timeout: 10000 });
  }

  /**
   * Nhập mã OTP và nhấn nút xác nhận để hoàn tất đăng ký.
   * @param otpCode Mã OTP gồm các chữ số
   */
  async enterOtpAndConfirm(otpCode: string): Promise<void> {
    await this.fill(this.otpInput, otpCode);
    await this.click(this.confirmOtpButton);
  }

  /**
   * Xác minh Đăng ký thành công (chuyển hướng về trang đăng nhập và hiển thị toast thành công).
   */
  async verifySignupSuccess(): Promise<void> {
    await this.page.waitForURL('**/signin', { timeout: 10000 });
    const toastBody = this.page.locator('.Toastify__toast-body');
    await expect(toastBody).toBeVisible({ timeout: 5000 });
  }
}
