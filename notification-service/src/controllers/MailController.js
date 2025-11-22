const { CREATED } = require("../core/success-response");
const MailService = require("../services/mail");

class MailController {
  // POST /api/v1/mail/contact
  async sendContact(req, res, next) {
    const { email, message } = req.body || {};
    if (!email || !message) {
      return res.status(400).json({ message: "Missing email or message" });
    }
    const result = await MailService.sendContact({ email, message });
    new CREATED({ message: "Liên hệ đã được gửi", metadata: result }).send(res);
  }

  // POST /api/v1/mail/redemption
  async sendRedemption(req, res, next) {
    const { to, userName, address, giftName } = req.body || {};
    console.log(req.body);
    if (!to || !userName || !giftName) {
      return res
        .status(400)
        .json({ message: "Missing to/userName/address/giftName" });
    }
    const result = await MailService.sendRedemption({
      to,
      userName,
      address,
      giftName,
    });
    new CREATED({
      message: "Đã gửi email xác nhận đổi quà",
      metadata: result,
    }).send(res);
  }

  // POST /api/v1/mail/send (generic)
  async sendGeneric(req, res, next) {
    const { to, subject, html, cc, bcc, attachments } = req.body || {};
    if (!to || !subject || !html) {
      return res.status(400).json({ message: "Missing to/subject/html" });
    }
    const result = await MailService.send({
      to,
      subject,
      html,
      cc,
      bcc,
      attachments,
    });
    new CREATED({ message: "Email sent", metadata: result }).send(res);
  }
}

module.exports = new MailController();
