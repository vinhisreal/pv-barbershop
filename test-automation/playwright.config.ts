import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Đọc file .env
dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: './src/tests',
  /* Chạy tất cả các test song song */
  fullyParallel: true,
  /* Fail build trên CI nếu lỡ commit test.only */
  forbidOnly: !!process.env.CI,
  /* Retry test 1 lần nếu fail để giảm flaky */
  retries: process.env.CI ? 2 : 1,
  /* Số worker chạy song song (1 trên CI để tiết kiệm tài nguyên, hoặc cấu hình tự động trên local) */
  workers: process.env.CI ? 1 : undefined,
  /* Báo cáo kết quả */
  reporter: [
    ['html', { open: 'never' }],
    ['list']
  ],
  /* Cấu hình chung cho mọi browser */
  use: {
    /* Đọc BASE_URL từ biến môi trường hoặc fallback về localhost */
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    /* Thu thập trace cho mỗi test case khi có lỗi */
    trace: 'retain-on-failure',
    /* Chụp screenshot khi test fail */
    screenshot: 'only-on-failure',
    /* Quay video khi test fail */
    video: 'retain-on-failure',
    /* Thiết lập Action timeout mặc định (10 giây) */
    actionTimeout: 10000,
  },
  /* Thiết lập Timeout mặc định cho mỗi test case (30 giây) */
  timeout: 30000,

  /* Cấu hình các trình duyệt test */
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 } // Đảm bảo viewport chuẩn 1920x1080 theo rules
      },
    },
    {
      name: 'firefox',
      use: { 
        ...devices['Desktop Firefox'],
        viewport: { width: 1920, height: 1080 } 
      },
    },
    {
      name: 'webkit',
      use: { 
        ...devices['Desktop Safari'],
        viewport: { width: 1920, height: 1080 } 
      },
    },
  ],
});
