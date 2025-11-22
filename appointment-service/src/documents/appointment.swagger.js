/**
 * @swagger
 * tags:
 *   - name: Appointment
 *     description: API quản lý lịch hẹn
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Appointment:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID lịch hẹn
 *           example: 670f2e6a8a5f3c2ab4b78912
 *         customer:
 *           type: string
 *           nullable: true
 *           description: ID khách hàng (User)
 *           example: 670f2e6a8a5f3c2ab4b12345
 *         customer_name:
 *           type: string
 *           example: Nguyễn Văn A
 *         phone_number:
 *           type: number
 *           example: 84901234567
 *         barber:
 *           type: string
 *           nullable: true
 *           description: ID thợ cắt tóc (User)
 *           example: 670f2e6a8a5f3c2ab4b67890
 *         service:
 *           type: array
 *           items:
 *             type: string
 *             example: 670f2e6a8a5f3c2ab4b22222
 *           description: Danh sách ID dịch vụ
 *         appointment_start:
 *           type: string
 *           format: date-time
 *           example: 2025-10-20T13:00:00.000Z
 *         appointment_end:
 *           type: string
 *           format: date-time
 *           example: 2025-10-20T14:00:00.000Z
 *         complete_picture:
 *           type: string
 *           example: https://res.cloudinary.com/pvbarbershop/image/upload/v1720000000/completed/abc123.jpg
 *         status:
 *           type: string
 *           enum: [pending, confirmed, completed, canceled]
 *           example: pending
 *         notes:
 *           type: string
 *           example: Khách muốn cắt tóc layer, cạo viền
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2025-10-16T13:00:00.000Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: 2025-10-16T13:30:00.000Z
 *
 *     AppointmentCreateInput:
 *       type: object
 *       required: [service, start, end]
 *       properties:
 *         customer:
 *           type: string
 *           nullable: true
 *           example: 670f2e6a8a5f3c2ab4b12345
 *         barber:
 *           type: string
 *           nullable: true
 *           example: 670f2e6a8a5f3c2ab4b67890
 *         service:
 *           type: array
 *           items:
 *             type: string
 *             example: 670f2e6a8a5f3c2ab4b22222
 *         start:
 *           type: string
 *           format: date-time
 *           example: 2025-10-20T13:00:00.000Z
 *         end:
 *           type: string
 *           format: date-time
 *           example: 2025-10-20T14:00:00.000Z
 *         customer_name:
 *           type: string
 *           example: Nguyễn Văn A
 *         phone_number:
 *           type: number
 *           example: 84901234567
 *         notes:
 *           type: string
 *           example: Muốn cắt kiểu Undercut hiện đại
 *
 *     AppointmentUpdateInput:
 *       type: object
 *       required: [_id]
 *       properties:
 *         _id:
 *           type: string
 *           example: 670f2e6a8a5f3c2ab4b78912
 *         customer:
 *           type: string
 *           nullable: true
 *           example: 670f2e6a8a5f3c2ab4b12345
 *         barber:
 *           type: string
 *           nullable: true
 *           example: 670f2e6a8a5f3c2ab4b67890
 *         service:
 *           type: array
 *           items:
 *             type: string
 *             example: 670f2e6a8a5f3c2ab4b22222
 *         appointment_start:
 *           type: string
 *           format: date-time
 *           example: 2025-10-20T13:00:00.000Z
 *         appointment_end:
 *           type: string
 *           format: date-time
 *           example: 2025-10-20T14:00:00.000Z
 *         customer_name:
 *           type: string
 *           example: Nguyễn Văn A
 *         phone_number:
 *           type: number
 *           example: 84901234567
 *         notes:
 *           type: string
 *           example: Cập nhật thời gian cắt tóc
 *         status:
 *           type: string
 *           enum: [pending, confirmed, completed, canceled]
 *           example: confirmed
 *
 *     AppointmentStatusUpdateInput:
 *       type: object
 *       required: [status]
 *       properties:
 *         status:
 *           type: string
 *           enum: [pending, confirmed, completed, canceled]
 *           example: completed
 *
 *     AppointmentProofUpdateInput:
 *       type: object
 *       required: [complete_picture]
 *       properties:
 *         complete_picture:
 *           type: string
 *           example: https://res.cloudinary.com/pvbarbershop/image/upload/v1720000000/completed/abc123.jpg
 *
 *     SuccessResponseAppointment:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Lịch hẹn được tạo thành công
 *         statusCode:
 *           type: integer
 *           example: 201
 *         metadata:
 *           $ref: '#/components/schemas/Appointment'
 *
 *     SuccessResponseAppointmentList:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Danh sách lịch hẹn
 *         statusCode:
 *           type: integer
 *           example: 200
 *         metadata:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Appointment'
 */

/**
 * @swagger
 * /appointment/create:
 *   post:
 *     summary: Tạo lịch hẹn mới
 *     tags: [Appointment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AppointmentCreateInput'
 *     responses:
 *       201:
 *         description: Tạo lịch hẹn thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponseAppointment'
 */

/**
 * @swagger
 * /appointment/{id}:
 *   get:
 *     summary: Lấy chi tiết một lịch hẹn
 *     tags: [Appointment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID lịch hẹn
 *       - in: query
 *         name: populate
 *         required: false
 *         schema:
 *           type: boolean
 *         description: Nếu true sẽ populate cả service lẫn barber
 *     responses:
 *       200:
 *         description: Thông tin lịch hẹn
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponseAppointment'
 *   delete:
 *     summary: Xóa lịch hẹn
 *     tags: [Appointment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Xóa lịch hẹn thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponseAppointment'
 */

/**
 * @swagger
 * /appointment/get-all:
 *   get:
 *     summary: Lấy tất cả lịch hẹn
 *     tags: [Appointment]
 *     responses:
 *       200:
 *         description: Danh sách lịch hẹn
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponseAppointmentList'
 */

/**
 * @swagger
 * /appointment/{id}:
 *   put:
 *     summary: Cập nhật lịch hẹn
 *     tags: [Appointment]
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
 *             $ref: '#/components/schemas/AppointmentUpdateInput'
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponseAppointment'
 */

/**
 * @swagger
 * /appointment/user/{userID}:
 *   get:
 *     summary: Lấy danh sách lịch hẹn theo khách hàng
 *     tags: [Appointment]
 *     parameters:
 *       - in: path
 *         name: userID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Danh sách lịch hẹn của khách hàng
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponseAppointmentList'
 */
/**
 * @swagger
 * /appointment/busy:
 *   get:
 *     summary: Get a list of overlapping appointments (busy schedule)
 *     tags: [Appointment]
 *     parameters:
 *       - in: query
 *         name: start
 *         required: true
 *         schema:
 *           type: string
 *           format: date-time
 *         description: "Start time (ISO 8601, e.g., 2025-10-20T13:00:00.000Z)"
 *       - in: query
 *         name: end
 *         required: true
 *         schema:
 *           type: string
 *           format: date-time
 *         description: "End time (ISO 8601, e.g., 2025-10-20T14:00:00.000Z)"
 *     responses:
 *       200:
 *         description: "List of appointments that overlap within the given time range"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponseAppointmentList'
 *       400:
 *         description: "Missing start or end query parameters"
 *       500:
 *         description: "Internal server error"
 */

/**
 * @swagger
 * /appointment/barber/{barberId}:
 *   get:
 *     summary: Lấy danh sách lịch hẹn theo thợ cắt tóc
 *     tags: [Appointment]
 *     parameters:
 *       - in: path
 *         name: barberId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Danh sách lịch hẹn của barber
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponseAppointmentList'
 */

/**
 * @swagger
 * /appointment/barber/{barberId}/filter:
 *   get:
 *     summary: Get barber's appointments filtered by status and date range
 *     tags: [Appointment]
 *     parameters:
 *       - in: path
 *         name: barberId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the barber
 *       - in: query
 *         name: status
 *         required: false
 *         schema:
 *           type: string
 *           enum: [pending, confirmed, completed, canceled]
 *         description: Filter appointments by status (optional)
 *       - in: query
 *         name: start
 *         required: false
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Start date (ISO 8601, e.g., 2025-10-20T13:00:00.000Z)
 *       - in: query
 *         name: end
 *         required: false
 *         schema:
 *           type: string
 *           format: date-time
 *         description: End date (ISO 8601, e.g., 2025-10-20T15:00:00.000Z)
 *     responses:
 *       200:
 *         description: Filtered appointments for the barber
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponseAppointmentList'
 *       400:
 *         description: Invalid date or missing parameters
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /appointment/{id}/status:
 *   put:
 *     summary: Cập nhật trạng thái lịch hẹn
 *     tags: [Appointment]
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
 *             $ref: '#/components/schemas/AppointmentStatusUpdateInput'
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponseAppointment'
 */

/**
 * @swagger
 * /appointment/{id}/proof:
 *   put:
 *     summary: Cập nhật ảnh chứng minh hoàn thành dịch vụ
 *     tags: [Appointment]
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
 *             $ref: '#/components/schemas/AppointmentProofUpdateInput'
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponseAppointment'
 */

 
