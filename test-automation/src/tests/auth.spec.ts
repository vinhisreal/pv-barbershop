import { test, expect } from './fixtures';
import { DataGenerator } from '../utils/dataGenerator';
import * as loginData from '../data/loginData.json';

test.describe('Module Xác Thực - Đăng Nhập & Đăng Ký', () => {
  
  test.beforeEach(async ({ loginPage }) => {
    // Trước mỗi test case, truy cập vào trang đăng nhập
    await loginPage.navigate();
  });

  test.describe('Chức năng Đăng Nhập (Sign In)', () => {
    
    // Áp dụng Data-Driven Testing từ file loginData.json cho các kịch bản đăng nhập lỗi
    for (const data of loginData.invalidAccounts) {
      test(`Đăng nhập thất bại: ${data.description}`, async ({ loginPage }) => {
        // Thực hiện đăng nhập với thông tin sai
        await loginPage.login(data.email, data.password);
        
        // Xác minh thông báo lỗi thích hợp xuất hiện (ví dụ: Toast thông báo lỗi)
        await loginPage.verifyLoginFailed(data.expectedMessage);
      });
    }

    test('Đăng nhập thành công với tài khoản Admin hợp lệ', async ({ loginPage }) => {
      // Lấy credentials từ biến môi trường .env
      const email = process.env.ADMIN_EMAIL || 'admin@example.com';
      const password = process.env.ADMIN_PASSWORD || '123456';
      
      // Thực hiện đăng nhập và chọn ghi nhớ
      await loginPage.login(email, password, true);
      
      // Xác minh đăng nhập thành công (chuyển trang thành công)
      await loginPage.verifyLoginSuccess();
    });
  });

  test.describe('Chức năng Đăng Ký (Sign Up)', () => {
    
    test.beforeEach(async ({ loginPage }) => {
      // Di chuyển từ trang đăng nhập sang trang đăng ký
      await loginPage.clickSignUpLink();
    });

    test('Yêu cầu đăng ký tài khoản mới thành công và hiển thị Modal nhập OTP', async ({ signupPage }) => {
      const testName = 'signup_flow';
      
      // Sinh dữ liệu động độc nhất và có tính traceable cao
      const fullName = DataGenerator.generateName('Khách Hàng Auto');
      const email = DataGenerator.generateEmail(testName);
      const password = DataGenerator.generatePassword(12);
      
      // Điền thông tin form Signup
      await signupPage.submitSignupForm(fullName, email, password, true);
      
      // Xác minh Modal nhập OTP xuất hiện thành công
      await signupPage.verifyOtpModalVisible();
    });
  });
});
