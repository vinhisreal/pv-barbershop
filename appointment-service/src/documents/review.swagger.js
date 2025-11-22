/**
 * @swagger
 * tags:
 *   - name: Review
 *     description: API quản lý đánh giá (review) cho dịch vụ và thợ cắt tóc
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 67102f9ab4c4a40f889cf678
 *         customer:
 *           type: string
 *           description: ID khách hàng hoặc tên khách
 *           example: 670f3a2e8a5f3c2ab4b45678
 *         barber:
 *           type: string
 *           description: ID của thợ cắt tóc
 *           example: 670f3a2e8a5f3c2ab4b45679
 *         service:
 *           type: array
 *           description: Danh sách ID các dịch vụ được review
 *           items:
 *             type: string
 *           example: ["670f3a2e8a5f3c2ab4b45680"]
 *         rating:
 *           type: number
 *           minimum: 1
 *           maximum: 5
 *           example: 5
 *         comment:
 *           type: string
 *           example: Rất hài lòng, thợ làm cẩn thận và thân thiện
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2025-10-16T13:00:00.000Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: 2025-10-16T13:30:00.000Z
 *
 *     ReviewCreateInput:
 *       type: object
 *       required: [customer, barber, service, rating]
 *       properties:
 *         customer:
 *           type: string
 *           example: 670f3a2e8a5f3c2ab4b45678
 *         barber:
 *           type: string
 *           example: 670f3a2e8a5f3c2ab4b45679
 *         service:
 *           type: array
 *           items:
 *             type: string
 *           example: ["670f3a2e8a5f3c2ab4b45680"]
 *         rating:
 *           type: number
 *           example: 4
 *         comment:
 *           type: string
 *           example: Dịch vụ tốt, cắt nhanh và đẹp
 *
 *     SuccessResponseReview:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Đánh giá đã được tạo thành công
 *         statusCode:
 *           type: integer
 *           example: 201
 *         metadata:
 *           $ref: '#/components/schemas/Review'
 */

/**
 * @swagger
 * /review/create:
 *   post:
 *     summary: Tạo đánh giá mới
 *     tags: [Review]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReviewCreateInput'
 *     responses:
 *       201:
 *         description: Đánh giá được tạo thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponseReview'
 *
 * /review/barber/{barberId}:
 *   get:
 *     summary: Lấy danh sách đánh giá của một thợ cắt tóc
 *     tags: [Review]
 *     parameters:
 *       - in: path
 *         name: barberId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Danh sách review
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Danh sách đánh giá của thợ
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 metadata:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Review'
 *
 * /review:
 *   get:
 *     summary: Lấy toàn bộ review
 *     tags: [Review]
 *     responses:
 *       200:
 *         description: Danh sách review
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Tất cả review
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 metadata:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Review'
 */
