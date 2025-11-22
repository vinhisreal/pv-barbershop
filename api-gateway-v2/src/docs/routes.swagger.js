/**
 * @swagger
 * components:
 *   schemas:
 *     ServiceRoute:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 670f5a5c2b4e3c12f9b32a87
 *         path:
 *           type: string
 *           example: /api/v1/invoice
 *           description: Đường dẫn cần proxy
 *         target:
 *           type: string
 *           example: http://localhost:4001
 *           description: Địa chỉ service đích (origin)
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     CreateServiceRouteRequest:
 *       type: object
 *       required: [path, target]
 *       properties:
 *         path:
 *           type: string
 *           example: /api/v1/invoice
 *           description: Đường dẫn cần proxy
 *         target:
 *           type: string
 *           example: http://localhost:4001
 *           description: Địa chỉ service đích (origin)
 */

/**
 * @swagger
 * tags:
 *   - name: Service Routes
 *     description: Quản lý routes dùng để proxy tới các service đích
 */

/**
 * @swagger
 * /routes:
 *   get:
 *     tags: [Service Routes]
 *     summary: Lấy danh sách tất cả service routes
 *     description: Danh sách route đã lưu trong MongoDB
 *     responses:
 *       200:
 *         description: Danh sách route đã lưu trong MongoDB
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ServiceRoute'
 *   post:
 *     tags: [Service Routes]
 *     summary: Tạo mới một service route
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateServiceRouteRequest'
 *     responses:
 *       201:
 *         description: Tạo mới route thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServiceRoute'
 */

/**
 * @swagger
 * /routes/{id}:
 *   delete:
 *     tags: [Service Routes]
 *     summary: Xóa một service route theo ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: 670f5a5c2b4e3c12f9b32a87
 *     responses:
 *       200:
 *         description: Xóa route thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 */
