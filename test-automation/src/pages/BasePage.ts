import { Page, Locator, expect } from '@playwright/test';

/**
 * BasePage đóng vai trò là class cơ sở cho tất cả các trang UI.
 * Chứa các wrapper methods an toàn, tích hợp sẵn cơ chế chờ thông minh (smart waits) của Playwright.
 */
export class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Chuyển hướng trình duyệt đến một URL cụ thể.
   * @param path Đường dẫn tương đối hoặc tuyệt đối
   */
  async goto(path: string): Promise<void> {
    await this.page.goto(path);
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Chuyển đổi selector dạng string hoặc Locator thành đối tượng Locator của Playwright.
   */
  protected getLocator(selector: string | Locator): Locator {
    if (typeof selector === 'string') {
      return this.page.locator(selector);
    }
    return selector;
  }

  /**
   * Hành động Click an toàn: tự động chờ element sẵn sàng và thực hiện click.
   */
  async click(selector: string | Locator): Promise<void> {
    const locator = this.getLocator(selector);
    await locator.waitFor({ state: 'visible' });
    await locator.click();
  }

  /**
   * Hành động Fill dữ liệu an toàn vào textbox: tự động chờ, focus, clear và điền text.
   */
  async fill(selector: string | Locator, text: string): Promise<void> {
    const locator = this.getLocator(selector);
    await locator.waitFor({ state: 'visible' });
    await locator.focus();
    await locator.fill('');
    await locator.fill(text);
  }

  /**
   * Lấy text content của element sau khi nó hiển thị.
   */
  async getText(selector: string | Locator): Promise<string> {
    const locator = this.getLocator(selector);
    await locator.waitFor({ state: 'visible' });
    const text = await locator.innerText();
    return text ? text.trim() : '';
  }

  /**
   * Đợi cho element xuất hiện trên màn hình.
   */
  async waitForElementToBeVisible(selector: string | Locator, timeout = 10000): Promise<void> {
    const locator = this.getLocator(selector);
    await locator.waitFor({ state: 'visible', timeout });
  }

  /**
   * Đợi cho element biến mất khỏi màn hình.
   */
  async waitForElementToBeHidden(selector: string | Locator, timeout = 10000): Promise<void> {
    const locator = this.getLocator(selector);
    await locator.waitFor({ state: 'hidden', timeout });
  }

  /**
   * Kiểm tra xem element có hiển thị hay không (trả về boolean không ném lỗi).
   */
  async isElementVisible(selector: string | Locator): Promise<boolean> {
    try {
      const locator = this.getLocator(selector);
      return await locator.isVisible();
    } catch {
      return false;
    }
  }

  /**
   * Lấy URL hiện tại của trang.
   */
  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  /**
   * Chờ trang load xong trạng thái mạng (network idle).
   */
  async waitForNetworkIdle(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }
}
