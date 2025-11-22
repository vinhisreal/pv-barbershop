/**
 * @swagger
 * tags:
 *   name: Invoice
 *   description: API quản lý hóa đơn
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Invoice:
 *       type: object
 *       required:
 *         - appointment_id
 *         - total_amount
 *         - payment_method
 *       properties:
 *         _id:
 *           type: string
 *           example: 652f7a6d2e4d330f2a334c22
 *         appointment_id:
 *           type: string
 *           description: ID của lịch hẹn liên kết
 *           example: 652f7a6d2e4d330f2a334b11
 *         total_amount:
 *           type: number
 *           example: 150000
 *         payment_method:
 *           type: string
 *           example: momo
 *         payment_status:
 *           type: string
 *           enum: [pending, paid, failed]
 *           example: paid
 *         createdAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /invoice/create:
 *   post:
 *     summary: Tạo mới hóa đơn
 *     tags: [Invoice]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               appointment_id:
 *                 type: string
 *                 example: 652f7a6d2e4d330f2a334b11
 *               total_amount:
 *                 type: number
 *                 example: 200000
 *               payment_method:
 *                 type: string
 *                 example: cash
 *     responses:
 *       201:
 *         description: Tạo hóa đơn thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Invoice'
 */

/**
 * @swagger
 * /invoice/user:
 *   get:
 *     summary: Lấy danh sách hóa đơn của user
 *     tags: [Invoice]
 *     parameters:
 *       - in: query
 *         name: userID
 *         schema:
 *           type: string
 *         required: true
 *         description: ID của người dùng
 *     responses:
 *       200:
 *         description: Danh sách hóa đơn của user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Invoice'
 */

/**
 * @swagger
 * /invoice:
 *   get:
 *     summary: Lấy toàn bộ hóa đơn trong hệ thống
 *     tags: [Invoice]
 *     parameters:
 *       - in: query
 *         name: populate
 *         schema:
 *           type: boolean
 *         required: false
 *         description: Có populate các dữ liệu liên quan không
 *     responses:
 *       200:
 *         description: Danh sách hóa đơn
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Invoice'
 */

/**
 * @swagger
 * /invoice/by-appointments:
 *   get:
 *     summary: Lấy danh sách hóa đơn theo nhiều appointment ID
 *     tags: [Invoice]
 *     parameters:
 *       - in: query
 *         name: ids
 *         required: true
 *         schema:
 *           type: string
 *         description: "Danh sách ID của các appointment, phân cách bằng dấu phẩy (ví dụ: 66f00a1c1a2b3c4d5e6f7g8h,77a11b22c33d44e55f66g77h)"
 *     responses:
 *       200:
 *         description: Danh sách hóa đơn tương ứng với các appointment ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invoices by appointments
 *                 metadata:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Invoice'
 *       400:
 *         description: Thiếu tham số ids hoặc định dạng không hợp lệ
 *       404:
 *         description: Không tìm thấy hóa đơn nào tương ứng
 *       500:
 *         description: Lỗi server nội bộ
 */


/**
 * @swagger
 * /invoice/{id}/status:
 *   put:
 *     summary: Cập nhật trạng thái thanh toán của hóa đơn
 *     tags: [Invoice]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của hóa đơn
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: paid
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Invoice'
 *       404:
 *         description: Không tìm thấy hóa đơn
 */
