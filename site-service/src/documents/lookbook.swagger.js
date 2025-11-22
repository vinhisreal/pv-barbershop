/**
 * @swagger
 * tags:
 *   name: Lookbook
 *   description: API quản lý ảnh lookbook và bộ sưu tập lookbook
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     LookbookImage:
 *       type: object
 *       required:
 *         - url
 *       properties:
 *         _id:
 *           type: string
 *           example: 67379c42e4d3f7a91c11b001
 *         url:
 *           type: string
 *           example: https://example.com/look1.jpg
 *         link:
 *           type: string
 *           example: https://example.com/product
 *         active:
 *           type: boolean
 *           example: false
 *         collection:
 *           type: string
 *           example: 67379c42e4d3f7a91c11b010
 *         createdAt:
 *           type: string
 *           format: date-time
 *
 *     LookbookCollection:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         _id:
 *           type: string
 *           example: 67379c42e4d3f7a91c11b010
 *         name:
 *           type: string
 *           example: W2M12
 *         active:
 *           type: boolean
 *           example: true
 *         createdAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /lookbook/image:
 *   post:
 *     summary: Tạo ảnh lookbook mới
 *     tags: [Lookbook]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *                 example: https://example.com/look1.jpg
 *               link:
 *                 type: string
 *                 example: https://example.com/product
 *               collection:
 *                 type: string
 *                 example: 67379c42e4d3f7a91c11b010
 *     responses:
 *       201:
 *         description: Tạo ảnh lookbook thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LookbookImage'
 */

/**
 * @swagger
 * /lookbook/collection:
 *   post:
 *     summary: Tạo bộ sưu tập lookbook mới
 *     tags: [Lookbook]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: W2M12
 *     responses:
 *       201:
 *         description: Tạo bộ sưu tập thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LookbookCollection'
 */

/**
 * @swagger
 * /lookbook/images:
 *   get:
 *     summary: Lấy danh sách ảnh lookbook
 *     tags: [Lookbook]
 *     responses:
 *       200:
 *         description: Danh sách ảnh lookbook
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/LookbookImage'
 */

/**
 * @swagger
 * /lookbook/collections:
 *   get:
 *     summary: Lấy danh sách bộ sưu tập lookbook
 *     tags: [Lookbook]
 *     responses:
 *       200:
 *         description: Danh sách bộ sưu tập lookbook
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/LookbookCollection'
 */

/**
 * @swagger
 * /lookbook/collection/{id}/active:
 *   put:
 *     summary: Bật/tắt trạng thái hoạt động của bộ sưu tập lookbook
 *     tags: [Lookbook]
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
 *                 example: false
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LookbookCollection'
 */
