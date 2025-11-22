const nodemailer = require("nodemailer");

function buildTransporter() {
  const driver = (process.env.MAIL_DRIVER || "gmail").toLowerCase();

  if (driver === "gmail") {
    // Gmail yêu cầu App Password, KHÔNG dùng mật khẩu đăng nhập
    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_NAME, // địa chỉ email gửi
        pass: process.env.MAIL_SECRET, // app password
      },
    });
  }

  // SMTP custom
  return nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT || 587),
    secure: process.env.MAIL_SECURE === "true", // true cho 465
    auth: {
      user: process.env.MAIL_USER || process.env.MAIL_NAME,
      pass: process.env.MAIL_SECRET,
    },
  });
}

const transporter = buildTransporter();

function fromAddress() {
  const name = process.env.MAIL_FROM_NAME || "Barber App";
  const addr = process.env.MAIL_FROM_ADDRESS || process.env.MAIL_NAME;
  return `"${name}" <${addr}>`;
}

async function verify() {
  try {
    await transporter.verify();
    console.log("[mailer] transporter verified OK");
  } catch (e) {
    console.error("[mailer] transporter verify failed:", e?.message || e);
  }
}

module.exports = {
  transporter,
  fromAddress,
  verify,
};
