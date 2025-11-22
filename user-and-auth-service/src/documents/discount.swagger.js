/**
 * @swagger
 * tags:
 *   name: Discount
 *   description: Discounts management
 */
/**
 * @swagger
 * /discount/create:
 *   post:
 *     summary: Create a new discount
 *     tags: [Discount]
 *     description: Create a new discount code with either a percentage or fixed amount discount.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 description: Discount code
 *                 example: "SUMMER2025"
 *               percentage:
 *                 type: number
 *                 description: Discount percentage (0–100)
 *                 example: 15
 *               amount:
 *                 type: number
 *                 description: Fixed discount amount
 *                 example: 50000
 *               start_date:
 *                 type: string
 *                 format: date-time
 *                 description: Date when discount starts
 *                 example: "2025-06-01T00:00:00Z"
 *               end_date:
 *                 type: string
 *                 format: date-time
 *                 description: Date when discount expires
 *                 example: "2025-06-30T23:59:59Z"
 *               is_active:
 *                 type: boolean
 *                 description: Whether the discount is currently active
 *                 example: true
 *     responses:
 *       201:
 *         description: Discount created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Discount created successfully"
 *                 metadata:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "6710b5a9c3e2e1234567890a"
 *                     code:
 *                       type: string
 *                       example: "SUMMER2025"
 *                     percentage:
 *                       type: number
 *                       example: 15
 *                     amount:
 *                       type: number
 *                       example: null
 *                     is_active:
 *                       type: boolean
 *                       example: true
 *       400:
 *         description: Missing required fields (code, percentage or amount)
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /discount/{id}/update:
 *   put:
 *     summary: Update an existing discount
 *     tags: [Discount]
 *     description: Update details of a specific discount code by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the discount to update
 *         example: "6710b5a9c3e2e1234567890a"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 description: Discount code
 *                 example: "SUMMER2025"
 *               percentage:
 *                 type: number
 *                 description: Discount percentage (0–100)
 *                 example: 20
 *               amount:
 *                 type: number
 *                 description: Fixed discount amount
 *                 example: null
 *               start_date:
 *                 type: string
 *                 format: date-time
 *                 description: Date when discount starts
 *                 example: "2025-06-10T00:00:00Z"
 *               end_date:
 *                 type: string
 *                 format: date-time
 *                 description: Date when discount expires
 *                 example: "2025-07-10T23:59:59Z"
 *               is_active:
 *                 type: boolean
 *                 description: Whether the discount is active
 *                 example: true
 *     responses:
 *       200:
 *         description: Discount updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Discount updated successfully"
 *                 metadata:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "6710b5a9c3e2e1234567890a"
 *                     code:
 *                       type: string
 *                       example: "SUMMER2025"
 *                     percentage:
 *                       type: number
 *                       example: 20
 *                     amount:
 *                       type: number
 *                       example: null
 *                     is_active:
 *                       type: boolean
 *                       example: true
 *                     start_date:
 *                       type: string
 *                       example: "2025-06-10T00:00:00Z"
 *                     end_date:
 *                       type: string
 *                       example: "2025-07-10T23:59:59Z"
 *       404:
 *         description: Discount not found
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /discount/list:
 *   get:
 *     summary: Get all valid discounts
 *     tags: [Discount]
 *     description: Retrieve all active discount codes that are currently valid based on start and end dates.
 *     responses:
 *       200:
 *         description: List of valid discounts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Valid discounts"
 *                 metadata:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "6710b5a9c3e2e1234567890a"
 *                       code:
 *                         type: string
 *                         example: "SUMMER2025"
 *                       percentage:
 *                         type: number
 *                         example: 15
 *                       amount:
 *                         type: number
 *                         example: null
 *                       is_active:
 *                         type: boolean
 *                         example: true
 *                       start_date:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-06-01T00:00:00Z"
 *                       end_date:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-06-30T23:59:59Z"
 *                       assigned_user:
 *                         type: object
 *                         nullable: true
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: "64f0b5a9c3e2e1234567890a"
 *                           user_name:
 *                             type: string
 *                             example: "Nguyen Van A"
 *                           user_email:
 *                             type: string
 *                             example: "user@gmail.com"
 *       404:
 *         description: No active discounts found
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /discount/apply:
 *   post:
 *     summary: Apply a discount code
 *     tags: [Discount]
 *     description: |
 *       Apply a discount code for a user. The discount code must be valid, active, and within its usage limits.
 *       The user_id is required to check if the discount can be applied to that specific user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *               - user_id
 *             properties:
 *               code:
 *                 type: string
 *                 example: "SUMMER2025"
 *                 description: The discount code to be applied.
 *               user_id:
 *                 type: string
 *                 example: "6710b5a9c3e2e1234567890a"
 *                 description: ID of the user applying the discount code.
 *     responses:
 *       200:
 *         description: Discount applied successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Discount applied"
 *                 metadata:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "6710b5a9c3e2e1234567890a"
 *                     code:
 *                       type: string
 *                       example: "SUMMER2025"
 *                     percentage:
 *                       type: number
 *                       example: 15
 *                     amount:
 *                       type: number
 *                       example: null
 *                     is_active:
 *                       type: boolean
 *                       example: true
 *                     used_count:
 *                       type: number
 *                       example: 12
 *                     usage_limit:
 *                       type: number
 *                       example: 100
 *                     start_date:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-06-01T00:00:00Z"
 *                     end_date:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-06-30T23:59:59Z"
 *                     assigned_user:
 *                       type: string
 *                       nullable: true
 *                       example: "64f0b5a9c3e2e1234567890a"
 *       400:
 *         description: Invalid or expired discount code
 *       404:
 *         description: Discount code not found or inactive
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /discount/user-discount/{id}:
 *   get:
 *     summary: Get all valid discounts available for a specific user
 *     tags: [Discount]
 *     description: |
 *       Retrieve all active and valid discounts for a given user.  
 *       This includes both user-specific discounts and general discounts (not assigned to any user).  
 *       Only discounts that are active, within the valid date range, and have remaining usage limits are returned.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to fetch discounts for.
 *         schema:
 *           type: string
 *           example: "6710b5a9c3e2e1234567890a"
 *     responses:
 *       200:
 *         description: List of valid discounts for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Discounts for user"
 *                 metadata:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "6710b5a9c3e2e1234567890b"
 *                       code:
 *                         type: string
 *                         example: "WELCOME2025"
 *                       percentage:
 *                         type: number
 *                         example: 20
 *                       amount:
 *                         type: number
 *                         example: null
 *                       is_active:
 *                         type: boolean
 *                         example: true
 *                       used_count:
 *                         type: number
 *                         example: 3
 *                       usage_limit:
 *                         type: number
 *                         example: 100
 *                       start_date:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-01-01T00:00:00Z"
 *                       end_date:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-12-31T23:59:59Z"
 *                       assigned_user:
 *                         type: object
 *                         nullable: true
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: "6710b5a9c3e2e1234567890a"
 *                           user_name:
 *                             type: string
 *                             example: "John Doe"
 *                           user_email:
 *                             type: string
 *                             example: "johndoe@example.com"
 *       404:
 *         description: No valid discounts found for this user
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /discount/{id}:
 *   delete:
 *     summary: Delete a discount by ID
 *     tags: [Discount]
 *     description: |
 *       Permanently delete a discount record based on its unique ID.  
 *       This action cannot be undone and should typically be restricted to administrators.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique ID of the discount to delete.
 *         schema:
 *           type: string
 *           example: "6710b5a9c3e2e1234567890b"
 *     responses:
 *       200:
 *         description: Discount deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Discount deleted"
 *                 metadata:
 *                   type: object
 *                   properties:
 *                     acknowledged:
 *                       type: boolean
 *                       example: true
 *                     deletedCount:
 *                       type: integer
 *                       example: 1
 *       404:
 *         description: Discount not found
 *       500:
 *         description: Internal server error
 */
