const axios = require("axios");
const crypto = require("crypto");

class PaymentService {
  async createMomoPayment({
    amount = "100000",
    paymentCode = "",
    redirectUrl = "https://momo.vn/return",
    orderInfo = "Thanh toán MoMo",
  }) {
    try {
      const partnerCode = "MOMO";
      const accessKey = "F8BBA842ECF85";
      const secretkey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
      const requestId = partnerCode + new Date().getTime();
      const orderId = requestId;
      const ipnUrl = "https://callback.url/notify";
      const requestType = "captureWallet";
      const extraData = "";

      const rawSignature =
        `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}` +
        `&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}` +
        `&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;

      const signature = crypto
        .createHmac("sha256", secretkey)
        .update(rawSignature)
        .digest("hex");

      const requestBody = {
        partnerCode,
        accessKey,
        requestId,
        amount,
        orderId,
        orderInfo,
        redirectUrl,
        ipnUrl,
        extraData,
        requestType,
        signature,
        lang: "en",
      };

      const response = await axios.post(
        "https://test-payment.momo.vn/v2/gateway/api/create",
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return { qr: response.data.qrCodeUrl, link: response.data.payUrl };
    } catch (err) {
      if (err.response) {
        console.error("Lỗi từ MoMo API:", err.response.data);
      } else if (err.request) {
        console.error("Không nhận được phản hồi từ MoMo:", err.request);
      } else {
        console.error("Lỗi khác:", err.message);
      }
      throw err;
    }
  }
}

module.exports = new PaymentService();
