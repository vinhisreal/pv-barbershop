/**
 * @swagger
 * tags:
 *   - name: Mail
 *     description: API gửi email hệ thống (contact, redemption, generic)
 */

/**
 * @swagger
 * /mail/contact:
 *   post:
 *     summary: Gửi email liên hệ đến admin
 *     tags: [Mail]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ContactRequest'
 *     responses:
 *       201:
 *         description: Đã gửi liên hệ
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MailSendResponse'
 */

/**
 * @swagger
 * /mail/redemption:
 *   post:
 *     summary: Gửi email xác nhận đổi quà đến người dùng
 *     tags: [Mail]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RedemptionRequest'
 *     responses:
 *       201:
 *         description: Đã gửi xác nhận đổi quà
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MailSendResponse'
 */

/**
 * @swagger
 * /mail/send:
 *   post:
 *     summary: Gửi email tùy ý (generic)
 *     tags: [Mail]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GenericMailRequest'
 *     responses:
 *       201:
 *         description: Đã gửi email
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MailSendResponse'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ContactRequest:
 *       type: object
 *       required:
 *         - email
 *         - message
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: customer@example.com
 *         message:
 *           type: string
 *           example: Tôi muốn được tư vấn thêm về dịch vụ.
 *
 *     RedemptionRequest:
 *       type: object
 *       required:
 *         - to
 *         - userName
 *         - address
 *         - giftName
 *       properties:
 *         to:
 *           type: string
 *           format: email
 *           example: customer@example.com
 *         userName:
 *           type: string
 *           example: John Doe
 *         address:
 *           type: string
 *           example: 123 Đường A, Quận B, TP. HCM
 *         giftName:
 *           type: string
 *           example: Lược tạo kiểu
 *
 *     GenericMailRequest:
 *       type: object
 *       required:
 *         - to
 *         - subject
 *         - html
 *       properties:
 *         to:
 *           type: string
 *           format: email
 *           example: someone@example.com
 *         subject:
 *           type: string
 *           example: Thông báo từ hệ thống
 *         html:
 *           type: string
 *           example: "<p>Nội dung HTML</p>"
 *         cc:
 *           type: array
 *           items:
 *             type: string
 *           example: ["cc1@example.com", "cc2@example.com"]
 *         bcc:
 *           type: array
 *           items:
 *             type: string
 *           example: ["hidden1@example.com"]
 *         attachments:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               filename:
 *                 type: string
 *                 example: "invoice.pdf"
 *               path:
 *                 type: string
 *                 example: "https://example.com/invoice.pdf"
 *               contentType:
 *                 type: string
 *                 example: "application/pdf"
 *
 *     MailSendResult:
 *       type: object
 *       properties:
 *         messageId:
 *           type: string
 *           example: "<abcd.1234@mail.example.com>"
 *         accepted:
 *           type: array
 *           items:
 *             type: string
 *           example: ["customer@example.com"]
 *         rejected:
 *           type: array
 *           items:
 *             type: string
 *           example: []
 *         response:
 *           type: string
 *           example: "250 2.0.0 OK  1713814376 x19-20020a1709061c1c00b0024df0f3c3si4367060ejc.662 - gsmtp"
 *
 *     MailSendResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Email sent
 *         metadata:
 *           $ref: '#/components/schemas/MailSendResult'
 */
