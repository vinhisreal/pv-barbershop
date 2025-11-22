/**
 * @swagger
 * tags:
 *   name: OTP
 *   description: API gửi và xác thực mã OTP
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     SendOtpRequest:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: user@example.com
 *
 *     VerifyOtpRequest:
 *       type: object
 *       required:
 *         - email
 *         - otp
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: user@example.com
 *         otp:
 *           type: string
 *           example: "123456"
 *
 *     OtpResponse:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           example: user@example.com
 *         verified:
 *           type: boolean
 *           example: true
 */

/**
 * @swagger
 * /otp/send:
 *   post:
 *     summary: Gửi mã OTP đến email
 *     tags: [OTP]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SendOtpRequest'
 *     responses:
 *       200:
 *         description: OTP đã được gửi đến email
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OtpResponse'
 *       400:
 *         description: Yêu cầu không hợp lệ
 *       500:
 *         description: Lỗi hệ thống
 */

/**
 * @swagger
 * /otp/verify:
 *   post:
 *     summary: Xác thực mã OTP
 *     tags: [OTP]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VerifyOtpRequest'
 *     responses:
 *       200:
 *         description: OTP hợp lệ
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OtpResponse'
 *       400:
 *         description: Mã OTP sai hoặc hết hạn
 *       404:
 *         description: Không tìm thấy OTP
 */
