/**
 * @swagger
 * tags:
 *   name: Payment
 *   description: API thanh toán MoMo
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     MomoPaymentRequest:
 *       type: object
 *       properties:
 *         amount:
 *           type: string
 *           example: "100000"
 *         paymentCode:
 *           type: string
 *           example: "INV20251015"
 *         redirectUrl:
 *           type: string
 *           example: "https://pvbarbershop.vn/payment/return"
 *         orderInfo:
 *           type: string
 *           example: "Thanh toán hóa đơn PV Barbershop"
 *       required:
 *         - amount
 *         - orderInfo
 *
 *     MomoPaymentResponse:
 *       type: object
 *       properties:
 *         qr:
 *           type: string
 *           example: "https://test-payment.momo.vn/qrcode/123abcxyz"
 *         link:
 *           type: string
 *           example: "https://test-payment.momo.vn/pay/123abcxyz"
 */

/**
 * @swagger
 * /payment/momo:
 *   post:
 *     summary: Tạo yêu cầu thanh toán MoMo
 *     tags: [Payment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MomoPaymentRequest'
 *     responses:
 *       200:
 *         description: Tạo liên kết thanh toán thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MomoPaymentResponse'
 *       400:
 *         description: Tham số không hợp lệ
 *       500:
 *         description: Lỗi phía MoMo hoặc server
 */
