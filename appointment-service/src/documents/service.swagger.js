/**
 * @swagger
 * tags:
 *   - name: Service
 *     description: API quản lý dịch vụ của tiệm cắt tóc
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Service:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID của dịch vụ
 *           example: 670f3a2e8a5f3c2ab4b45678
 *         service_name:
 *           type: string
 *           description: Tên dịch vụ
 *           example: Cắt tóc nam cơ bản
 *         service_price:
 *           type: number
 *           description: Giá dịch vụ (VNĐ)
 *           example: 80000
 *         service_duration:
 *           type: number
 *           description: Thời lượng dịch vụ (phút)
 *           example: 30
 *         service_description:
 *           type: string
 *           description: Mô tả chi tiết về dịch vụ
 *           example: Cắt tóc, gội đầu và sấy tạo kiểu
 *         service_image:
 *           type: string
 *           description: Ảnh minh họa dịch vụ (URL Cloudinary)
 *           example: https://res.cloudinary.com/pvbarbershop/image/upload/v1720000000/services/cat_toc_nam.jpg
 *         isActive:
 *           type: boolean
 *           description: Trạng thái hoạt động của dịch vụ
 *           example: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2025-10-16T13:00:00.000Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: 2025-10-16T13:30:00.000Z
 *
 *     ServiceCreateInput:
 *       type: object
 *       required: [service_name, service_price, service_duration]
 *       properties:
 *         service_name:
 *           type: string
 *           example: Gội đầu thư giãn
 *         service_price:
 *           type: number
 *           example: 60000
 *         service_duration:
 *           type: number
 *           example: 20
 *         service_description:
 *           type: string
 *           example: Gội đầu, massage đầu và vai
 *         service_image:
 *           type: string
 *           example: https://res.cloudinary.com/pvbarbershop/image/upload/v1720000000/services/goi_dau.jpg
 *
 *     ServiceUpdateInput:
 *       type: object
 *       properties:
 *         service_name:
 *           type: string
 *           example: Cắt tóc cao cấp
 *         service_price:
 *           type: number
 *           example: 120000
 *         service_duration:
 *           type: number
 *           example: 45
 *         service_description:
 *           type: string
 *           example: Cắt tóc, gội đầu, cạo mặt và tạo kiểu
 *         service_image:
 *           type: string
 *           example: https://res.cloudinary.com/pvbarbershop/image/upload/v1720000000/services/cao_cap.jpg
 *         isActive:
 *           type: boolean
 *           example: true
 *
 *     SuccessResponseService:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Dịch vụ được tạo thành công
 *         statusCode:
 *           type: integer
 *           example: 201
 *         metadata:
 *           $ref: '#/components/schemas/Service'
 *
 *     SuccessResponseServiceList:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Danh sách dịch vụ
 *         statusCode:
 *           type: integer
 *           example: 200
 *         metadata:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Service'
 */

/**
 * @swagger
 * /service/create:
 *   post:
 *     summary: Tạo dịch vụ mới
 *     tags: [Service]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ServiceCreateInput'
 *     responses:
 *       201:
 *         description: Dịch vụ được tạo thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponseService'
 */

/**
 * @swagger
 * /service/all:
 *   get:
 *     summary: Lấy tất cả dịch vụ
 *     tags: [Service]
 *     responses:
 *       200:
 *         description: Danh sách dịch vụ
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponseServiceList'
 */

/**
 * @swagger
 * /service/{id}:
 *   get:
 *     summary: Lấy thông tin chi tiết một dịch vụ
 *     tags: [Service]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Chi tiết dịch vụ
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponseService'
 *   put:
 *     summary: Cập nhật thông tin dịch vụ
 *     tags: [Service]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ServiceUpdateInput'
 *     responses:
 *       200:
 *         description: Cập nhật dịch vụ thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponseService'
 *   delete:
 *     summary: Xóa dịch vụ
 *     tags: [Service]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dịch vụ đã được xóa
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponseService'
 */
