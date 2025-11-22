const { transporter, fromAddress } = require("../configs/mailer");
const {
  contactTemplate,
  redemptionTemplate,
  otpTemplate,
} = require("../templates/mail");

class MailService {
  // Gửi mail chung
  async send({ to, subject, html, cc, bcc, attachments }) {
    const info = await transporter.sendMail({
      from: fromAddress(),
      to,
      subject,
      html,
      cc,
      bcc,
      attachments,
    });

    return {
      messageId: info?.messageId,
      accepted: info?.accepted || [],
      rejected: info?.rejected || [],
      response: info?.response,
    };
  }

  // Liên hệ gửi về admin
  async sendContact({ email, message }) {
    const admin = process.env.MAIL_ADMIN || process.env.MAIL_NAME;
    const html = contactTemplate({ email, message });
    const subject = "Liên hệ từ khách hàng";
    return this.send({ to: admin, subject, html });
  }

  // Xác nhận đổi quà
  async sendRedemption({ to, userName, address, giftName }) {
    const html = redemptionTemplate({ userName, address, giftName });
    const subject = `Xác nhận đổi quà: ${giftName}`;
    return this.send({ to, subject, html });
  }

  // Gửi OTP (dùng trực tiếp trong service OTP cùng microservice notification)
  async sendOtpEmail({ to, otp, expiresInMinutes = 5 }) {
    const html = otpTemplate({ otp, minutes: expiresInMinutes });
    const subject = "Mã xác thực OTP";
    return this.send({ to, subject, html });
  }
}

module.exports = new MailService();
