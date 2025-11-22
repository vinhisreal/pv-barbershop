/**
 * @swagger
 * tags:
 *   name: Gift
 *   description: Gift management
 */
/**
 * @swagger
 * /gift/create:
 *   post:
 *     summary: Create a new gift
 *     tags: [Gift]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - required_points
 *               - quantity
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Free Haircut"
 *                 description: Name of the gift
 *               required_points:
 *                 type: integer
 *                 example: 100
 *                 description: Points required to redeem this gift
 *               quantity:
 *                 type: integer
 *                 example: 50
 *                 description: Number of gifts available
 *     responses:
 *       201:
 *         description: Gift created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Gift created successfully"
 *                 metadata:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "64f0b5a9c3e2e1234567890c"
 *                     name:
 *                       type: string
 *                       example: "Free Haircut"
 *                     required_points:
 *                       type: integer
 *                       example: 100
 *                     quantity:
 *                       type: integer
 *                       example: 50
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /gift/{id}/update:
 *   put:
 *     summary: Update an existing gift
 *     tags: [Gift]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the gift to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Premium Haircut"
 *                 description: Updated name of the gift
 *               required_points:
 *                 type: integer
 *                 example: 150
 *                 description: Updated points required
 *               quantity:
 *                 type: integer
 *                 example: 30
 *                 description: Updated quantity
 *     responses:
 *       200:
 *         description: Gift updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Gift updated successfully"
 *                 metadata:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "64f0b5a9c3e2e1234567890c"
 *                     name:
 *                       type: string
 *                       example: "Premium Haircut"
 *                     required_points:
 *                       type: integer
 *                       example: 150
 *                     quantity:
 *                       type: integer
 *                       example: 30
 *       404:
 *         description: Gift not found
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /gift/list:
 *   get:
 *     summary: Get list of all active gifts within the valid date range
 *     tags: [Gift]
 *     responses:
 *       200:
 *         description: Active gift list retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Active gift list"
 *                 metadata:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "64f0b5a9c3e2e1234567890c"
 *                       name:
 *                         type: string
 *                         example: "Free Haircut"
 *                       required_points:
 *                         type: integer
 *                         example: 100
 *                       quantity:
 *                         type: integer
 *                         example: 50
 *                       is_active:
 *                         type: boolean
 *                         example: true
 *                       start_date:
 *                         type: string
 *                         format: date
 *                         example: "2025-10-01"
 *                       end_date:
 *                         type: string
 *                         format: date
 *                         example: "2025-12-31"
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /gift/redeem:
 *   post:
 *     summary: Redeem a gift using user points
 *     tags: [Gift]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - gift_id
 *               - user_points
 *               - user_id
 *             properties:
 *               gift_id:
 *                 type: string
 *                 example: "64f0b5a9c3e2e1234567890c"
 *                 description: ID of the gift to redeem
 *               user_points:
 *                 type: integer
 *                 example: 120
 *                 description: Current points of the user
 *               user_id:
 *                 type: string
 *                 example: "64f0b5a9c3e2e1234567890a"
 *                 description: ID of the user redeeming the gift
 *     responses:
 *       200:
 *         description: Gift redeemed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Gift redeemed successfully"
 *                 metadata:
 *                   type: object
 *                   properties:
 *                     redemption:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: "64f0b5a9c3e2e1234567890d"
 *                         user:
 *                           type: string
 *                           example: "64f0b5a9c3e2e1234567890a"
 *                         gift:
 *                           type: string
 *                           example: "64f0b5a9c3e2e1234567890c"
 *                         points_used:
 *                           type: integer
 *                           example: 100
 *                     updated_point:
 *                       type: integer
 *                       example: 20
 *       400:
 *         description: Gift not available, expired, out of stock, or not enough points
 *       404:
 *         description: Gift not found
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /gift/redemptions:
 *   get:
 *     summary: Get all redeemed gifts of a specific user
 *     tags: [Gift]
 *     parameters:
 *       - in: query
 *         name: userID
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user whose redeemed gifts you want to fetch
 *         example: "64f0b5a9c3e2e1234567890a"
 *     responses:
 *       200:
 *         description: List of user's redeemed gifts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User's redeemed gifts"
 *                 metadata:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "64f0b5a9c3e2e1234567890d"
 *                       user:
 *                         type: object
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
 *                       gift:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: "64f0b5a9c3e2e1234567890c"
 *                           name:
 *                             type: string
 *                             example: "Free Haircut Voucher"
 *                           required_points:
 *                             type: integer
 *                             example: 100
 *                       points_used:
 *                         type: integer
 *                         example: 100
 *       400:
 *         description: Missing userID query parameter
 *       404:
 *         description: No redemption found for this user
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /gift/all-redemption:
 *   get:
 *     summary: Get all redeemed gifts (for admin)
 *     tags: [Gift]
 *     description: Retrieve a list of all redeemed gifts by all users. This endpoint is typically used by administrators to view all redemption records.
 *     responses:
 *       200:
 *         description: List of all redemption records
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User's redeemed gifts"
 *                 metadata:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "64f0b5a9c3e2e1234567890d"
 *                       user:
 *                         type: object
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
 *                           user_point:
 *                             type: integer
 *                             example: 1200
 *                       gift:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: "64f0b5a9c3e2e1234567890c"
 *                           name:
 *                             type: string
 *                             example: "Free Haircut Voucher"
 *                           required_points:
 *                             type: integer
 *                             example: 100
 *                           is_active:
 *                             type: boolean
 *                             example: true
 *                       points_used:
 *                         type: integer
 *                         example: 100
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-10-16T08:45:00.000Z"
 *       404:
 *         description: No redemption records found
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /gift/redemption/{id}:
 *   delete:
 *     summary: Delete a redemption record (mark as completed)
 *     tags: [Gift]
 *     description: Delete a specific redemption record by its ID, typically used to mark a redemption as completed or remove invalid entries.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the redemption record to delete
 *         example: "670f5a9c3e2e1234567890d"
 *     responses:
 *       200:
 *         description: Redemption completed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Redemption completed"
 *                 metadata:
 *                   type: object
 *                   properties:
 *                     acknowledged:
 *                       type: boolean
 *                       example: true
 *                     deletedCount:
 *                       type: integer
 *                       example: 1
 *       400:
 *         description: Invalid redemption ID
 *       404:
 *         description: Redemption record not found
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /gift/{id}:
 *   delete:
 *     summary: Delete a gift by ID
 *     tags: [Gift]
 *     description: Permanently delete a gift from the database using its unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the gift to delete
 *         example: "670f5a9c3e2e1234567890a"
 *     responses:
 *       200:
 *         description: Gift deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Gifts deleted"
 *                 metadata:
 *                   type: object
 *                   properties:
 *                     acknowledged:
 *                       type: boolean
 *                       example: true
 *                     deletedCount:
 *                       type: integer
 *                       example: 1
 *       400:
 *         description: Invalid gift ID
 *       404:
 *         description: Gift not found
 *       500:
 *         description: Internal server error
 */
