const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_NAME,
    pass: process.env.MAIL_SECRET,
  },
});

const sendMail = ({ to, subject, html }) => {
  return transporter.sendMail({
    from: `"Barber App" <${process.env.MAIL_NAME}>`,
    to,
    subject,
    html,
  });
};

module.exports = sendMail;
