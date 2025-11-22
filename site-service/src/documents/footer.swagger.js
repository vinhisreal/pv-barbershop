/**
 * @swagger
 * tags:
 *   name: Footer
 *   description: API quản lý ảnh footer và bộ sưu tập footer
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     FooterImage:
 *       type: object
 *       required:
 *         - url
 *       properties:
 *         _id:
 *           type: string
 *           example: 67379c42e4d3f7a91c11a8b1
 *         url:
 *           type: string
 *           example: https://example.com/footer1.jpg
 *         link:
 *           type: string
 *           example: https://example.com/shop
 *         active:
 *           type: boolean
 *           example: true
 *         collection:
 *           type: string
 *           example: 67379c42e4d3f7a91c11a8b9
 *         createdAt:
 *           type: string
 *           format: date-time
 *
 *     FooterCollection:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         _id:
 *           type: string
 *           example: 67379c42e4d3f7a91c11a8b9
 *         name:
 *           type: string
 *           example: W1M11
 *         active:
 *           type: boolean
 *           example: false
 *         createdAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /footer/image:
 *   post:
 *     summary: Tạo ảnh footer mới
 *     tags: [Footer]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *                 example: https://example.com/footer1.jpg
 *               link:
 *                 type: string
 *                 example: https://example.com/shop
 *               collection:
 *                 type: string
 *                 example: 67379c42e4d3f7a91c11a8b9
 *     responses:
 *       201:
 *         description: Tạo ảnh footer thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FooterImage'
 */

/**
 * @swagger
 * /footer/collection:
 *   post:
 *     summary: Tạo bộ sưu tập footer mới
 *     tags: [Footer]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: W1M11
 *     responses:
 *       201:
 *         description: Tạo bộ sưu tập thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FooterCollection'
 */

/**
 * @swagger
 * /footer/images:
 *   get:
 *     summary: Lấy danh sách ảnh footer
 *     tags: [Footer]
 *     responses:
 *       200:
 *         description: Danh sách ảnh footer
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FooterImage'
 */

/**
 * @swagger
 * /footer/collections:
 *   get:
 *     summary: Lấy danh sách bộ sưu tập footer
 *     tags: [Footer]
 *     responses:
 *       200:
 *         description: Danh sách bộ sưu tập footer
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FooterCollection'
 */

/**
 * @swagger
 * /footer/collection/{id}/active:
 *   put:
 *     summary: Bật/tắt trạng thái hoạt động của bộ sưu tập footer
 *     tags: [Footer]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của bộ sưu tập
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               active:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FooterCollection'
 */
