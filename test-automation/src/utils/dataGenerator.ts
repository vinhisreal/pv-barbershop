/**
 * DataGenerator cung cấp các helper sinh dữ liệu ngẫu nhiên phục vụ kiểm thử.
 * Đảm bảo dữ liệu sinh ra là duy nhất (unique) tránh xung đột khi chạy parallel, 
 * và dễ dàng truy vết (traceable) trong cơ sở dữ liệu nếu xảy ra lỗi.
 */
export class DataGenerator {
  /**
   * Sinh email ngẫu nhiên và traceable.
   * Format: auto_[testName]_[timestamp]_[random]@auto.test
   * @param testName Tên test case để làm tiền tố định danh
   */
  static generateEmail(testName: string): string {
    const formattedTestName = testName
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '_')
      .substring(0, 15);
    const timestamp = Date.now();
    const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `auto_${formattedTestName}_${timestamp}_${randomSuffix}@auto.test`;
  }

  /**
   * Sinh tên khách hàng ngẫu nhiên.
   * Format: Auto User [random]
   */
  static generateName(prefix = 'Auto User'): string {
    const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `${prefix} ${randomSuffix}`;
  }

  /**
   * Sinh mật khẩu ngẫu nhiên có độ dài mong muốn.
   */
  static generatePassword(length = 10): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      password += chars.charAt(randomIndex);
    }
    return password;
  }
}
