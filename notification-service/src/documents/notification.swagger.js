/**
 * @swagger
 * tags:
 *   - name: Notification
 *     description: API quản lý thông báo của người dùng
 */

/**
 * @swagger
 * /notification/create:
 *   post:
 *     summary: Tạo thông báo mới
 *     tags: [Notification]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user
 *               - title
 *               - content
 *             properties:
 *               user:
 *                 type: string
 *                 description: ID của người nhận thông báo
 *                 example: 6702b4c92f6e87a5018de31f
 *               title:
 *                 type: string
 *                 example: Đơn hàng của bạn đã được xác nhận
 *               content:
 *                 type: string
 *                 example: Cảm ơn bạn đã đặt lịch tại PV Barbershop!
 *               type:
 *                 type: string
 *                 example: appointment
 *     responses:
 *       201:
 *         description: Thông báo được tạo thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Notification created successfully
 *                 metadata:
 *                   $ref: '#/components/schemas/Notification'
 */

/**
 * @swagger
 * /notification/list/{userId}:
 *   get:
 *     summary: Lấy danh sách thông báo của người dùng
 *     tags: [Notification]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của người dùng
 *     responses:
 *       200:
 *         description: Danh sách thông báo theo thứ tự mới nhất
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User notifications
 *                 metadata:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Notification'
 */

/**
 * @swagger
 * /notification/{id}/mark-read:
 *   put:
 *     summary: Đánh dấu một thông báo là đã đọc
 *     tags: [Notification]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của thông báo
 *     responses:
 *       200:
 *         description: Cập nhật trạng thái đọc thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Notification marked as read
 *                 metadata:
 *                   $ref: '#/components/schemas/Notification'
 */

/**
 * @swagger
 * /notification/{id}:
 *   delete:
 *     summary: Xóa một thông báo cụ thể
 *     tags: [Notification]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của thông báo cần xóa
 *     responses:
 *       200:
 *         description: Thông báo đã được xóa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Notification deleted
 */

/**
 * @swagger
 * /notification/delete-all/{userID}:
 *   delete:
 *     summary: Xóa tất cả thông báo của một người dùng
 *     tags: [Notification]
 *     parameters:
 *       - in: path
 *         name: userID
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của người dùng
 *     responses:
 *       200:
 *         description: Toàn bộ thông báo của người dùng đã bị xóa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Notification deleted
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Notification:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 6702c7efb65bcb63c32f0f4a
 *         user:
 *           type: string
 *           example: 6702b4c92f6e87a5018de31f
 *         title:
 *           type: string
 *           example: Đơn hàng của bạn đã được xác nhận
 *         content:
 *           type: string
 *           example: Cảm ơn bạn đã đặt lịch tại PV Barbershop!
 *         type:
 *           type: string
 *           example: appointment
 *         is_read:
 *           type: boolean
 *           example: false
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2025-10-15T10:45:32.000Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: 2025-10-15T10:45:32.000Z
 */
