function baseLayout(content) {
  const brand = process.env.MAIL_FROM_NAME || "Barber App";
  return `
    <div style="font-family:Arial,Helvetica,sans-serif;line-height:1.6;color:#222">
      <div style="max-width:640px;margin:0 auto;padding:24px;border:1px solid #eee;border-radius:8px">
        <h2 style="margin-top:0">${brand}</h2>
        ${content}
        <hr style="border:none;border-top:1px solid #eee;margin:24px 0"/>
        <p style="font-size:12px;color:#666;margin:0">This is an automated message. Please do not reply.</p>
      </div>
    </div>
  `;
}

function contactTemplate({ email, message }) {
  return baseLayout(`
    <p><strong>Email người liên hệ:</strong> ${email}</p>
    <p><strong>Nội dung:</strong></p>
    <div style="white-space:pre-wrap">${message}</div>
  `);
}

function redemptionTemplate({ userName, address, giftName }) {
  const deliveryText = address
    ? `Chúng tôi sẽ gửi món quà đến địa chỉ: <strong>${address}</strong>.`
    : `Hiện bạn chưa cung cấp địa chỉ nhận hàng. Vui lòng đến cửa hàng để nhận quà trực tiếp.`;

  return baseLayout(`
    <p>Xin chào <strong>${userName}</strong>,</p>

    <p>Bạn đã đổi thành công món quà: <strong>${giftName}</strong>.</p>

    <p>${deliveryText}</p>

    <p>Vui lòng giữ liên lạc để được hỗ trợ khi cần thiết. Cảm ơn bạn!</p>
    <br/>
    <p>-- Đội ngũ hỗ trợ khách hàng --</p>
  `);
}

function otpTemplate({ otp, minutes = 5 }) {
  return baseLayout(`
    <p>Mã OTP của bạn là: <b style="font-size:18px">${otp}</b></p>
    <p>Mã này sẽ hết hạn sau ${minutes} phút.</p>
  `);
}

module.exports = {
  contactTemplate,
  redemptionTemplate,
  otpTemplate,
};
