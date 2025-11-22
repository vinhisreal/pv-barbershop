const otpService = require("../services/otp");
const { CREATED, OK } = require("../core/success-response");

class OtpController {
  async sendOtp(req, res) {
    const { email } = req.body;
    const result = await otpService.sendOtp(email);
    new CREATED({
      message: "OTP đã được gửi tới email.",
      metadata: result,
    }).send(res);
  }

  async verifyOtp(req, res) {
    const { email, otp } = req.body;
    const result = await otpService.verifyOtp(email, otp);
    new OK({
      message: "Xác minh OTP thành công.",
      metadata: result,
    }).send(res);
  }
}

module.exports = new OtpController();
