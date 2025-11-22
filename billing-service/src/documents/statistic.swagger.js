/**
 * @swagger
 * tags:
 *   - name: Statistic - Barber
 *     description: API thống kê của từng barber
 *   - name: Statistic - System
 *     description: API thống kê tổng hệ thống
 */

/**
 * @swagger
 * /statistic/barber/{barberID}/rating:
 *   get:
 *     summary: Lấy điểm đánh giá trung bình của một barber
 *     tags: [Statistic - Barber]
 *     parameters:
 *       - in: path
 *         name: barberID
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của barber
 *     responses:
 *       200:
 *         description: Trả về điểm trung bình và số lượng đánh giá
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 averageRating:
 *                   type: number
 *                   example: 4.7
 *                 totalReview:
 *                   type: integer
 *                   example: 12
 */

/**
 * @swagger
 * /statistic/barbers/rating:
 *   get:
 *     summary: Lấy danh sách barber theo điểm đánh giá trung bình
 *     tags: [Statistic - Barber]
 *     responses:
 *       200:
 *         description: Danh sách barber với điểm trung bình và số lượng đánh giá
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   barberID:
 *                     type: string
 *                   barberName:
 *                     type: string
 *                   barberAvatar:
 *                     type: string
 *                   averageRating:
 *                     type: number
 *                   totalReview:
 *                     type: integer
 */

/**
 * @swagger
 * /statistic/barber/{barberID}/income/month:
 *   get:
 *     summary: Lấy tổng thu nhập của barber trong tháng hiện tại
 *     tags: [Statistic - Barber]
 *     parameters:
 *       - in: path
 *         name: barberID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tổng thu nhập trong tháng
 *         content:
 *           application/json:
 *             schema:
 *               type: number
 *               example: 2500000
 */

/**
 * @swagger
 * /statistic/barber/{barberID}/income/year:
 *   get:
 *     summary: Lấy thu nhập theo tháng của barber trong 1 năm
 *     tags: [Statistic - Barber]
 *     parameters:
 *       - in: path
 *         name: barberID
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: year
 *         required: false
 *         schema:
 *           type: integer
 *           example: 2025
 *     responses:
 *       200:
 *         description: Mảng thu nhập theo từng tháng
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   month:
 *                     type: integer
 *                   totalIncome:
 *                     type: number
 */

/**
 * @swagger
 * /statistic/system/income/month:
 *   get:
 *     summary: Lấy tổng thu nhập của hệ thống trong tháng hiện tại
 *     tags: [Statistic - System]
 *     responses:
 *       200:
 *         description: Tổng thu nhập hệ thống tháng này
 *         content:
 *           application/json:
 *             schema:
 *               type: number
 *               example: 75000000
 */

/**
 * @swagger
 * /statistic/system/income/year:
 *   get:
 *     summary: Lấy thu nhập của hệ thống theo từng tháng trong 1 năm
 *     tags: [Statistic - System]
 *     parameters:
 *       - in: query
 *         name: year
 *         schema:
 *           type: integer
 *           example: 2025
 *     responses:
 *       200:
 *         description: Dữ liệu thu nhập từng tháng
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   month:
 *                     type: integer
 *                   totalIncome:
 *                     type: number
 */

/**
 * @swagger
 * /statistic/system/appointment/year:
 *   get:
 *     summary: Lấy số lượng lịch hẹn hoàn thành theo từng tháng trong năm
 *     tags: [Statistic - System]
 *     parameters:
 *       - in: query
 *         name: year
 *         schema:
 *           type: integer
 *           example: 2025
 *     responses:
 *       200:
 *         description: Dữ liệu số lượng lịch hẹn hoàn thành mỗi tháng
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   month:
 *                     type: integer
 *                   count:
 *                     type: integer
 */
