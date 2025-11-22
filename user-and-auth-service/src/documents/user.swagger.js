/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management
 */
/**
 * @swagger
 * /user/signin:
 *   post:
 *     summary: User SignIn
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@gmail.com"
 *               password:
 *                 type: string
 *                 example: "123456"
 *               refresh_token:
 *                 type: string
 *                 nullable: true
 *                 example: null
 *     responses:
 *       200:
 *         description: Login successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Login successfully"
 *                 metadata:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: "64f0b5a9c3e2e1234567890a"
 *                         user_name:
 *                           type: string
 *                           example: "John Doe"
 *                         user_email:
 *                           type: string
 *                           example: "john.doe@example.com"
 *                         user_avatar:
 *                           type: string
 *                           nullable: true
 *                           example: null
 *                         user_birthday:
 *                           type: string
 *                           nullable: true
 *                           example: "2000-01-01"
 *                         user_phone:
 *                           type: string
 *                           nullable: true
 *                           example: "+84123456789"
 *                         user_gender:
 *                           type: string
 *                           nullable: true
 *                           example: "male"
 *                         user_role:
 *                           type: string
 *                           example: "user"
 *                         user_point:
 *                           type: integer
 *                           example: 100
 *                     tokens:
 *                       type: object
 *                       properties:
 *                         accessToken:
 *                           type: string
 *                           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                         refreshToken:
 *                           type: string
 *                           example: "dGhpc2lzcmVmcmVzaHRva2Vu..."
 *       400:
 *         description: Bad request (e.g., user not registered, deleted, or wrong password)
 *       500:
 *         description: Internal server error
 * 
 */

/**
 * @swagger
 * /user/signup:
 *   post:
 *     summary: User SignUp
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Le Phan The Vi"
 *               email:
 *                 type: string
 *                 example: "user@gmail.com"
 *               password:
 *                 type: string
 *                 example: "123456"
 *               isAdmin:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       201:
 *         description: Registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 201
 *                 metadata:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: "64f0b5a9c3e2e1234567890a"
 *                         user_name:
 *                           type: string
 *                           example: "John Doe"
 *                         user_email:
 *                           type: string
 *                           example: "john.doe@example.com"
 *                         user_avatar:
 *                           type: string
 *                           nullable: true
 *                           example: null
 *                         user_role:
 *                           type: string
 *                           example: "user"
 *                     tokens:
 *                       type: object
 *                       properties:
 *                         accessToken:
 *                           type: string
 *                           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                         refreshToken:
 *                           type: string
 *                           example: "dGhpc2lzcmVmcmVzaHRva2Vu..."
 *       400:
 *         description: Bad request (e.g., email already registered or keyStore error)
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /user/create-account:
 *   post:
 *     summary: Create a new user account
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_name
 *               - user_email
 *               - user_role
 *             properties:
 *               user_name:
 *                 type: string
 *                 example: "Jane Doe"
 *                 description: Full name of the user
 *               user_email:
 *                 type: string
 *                 example: "user@gmail.com"
 *                 description: User's email (must be unique)
 *               user_avatar:
 *                 type: string
 *                 nullable: true
 *                 example: "https://example.com/avatar.jpg"
 *               user_role:
 *                 type: string
 *                 example: "staff"
 *                 description: "Role of the user. One of: admin, staff, customer, receptionist"
 *               user_gender:
 *                 type: string
 *                 nullable: true
 *                 example: "female"
 *     responses:
 *       201:
 *         description: Account created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 201
 *                 metadata:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: "64f0b5a9c3e2e1234567890a"
 *                         user_name:
 *                           type: string
 *                           example: "Jane Doe"
 *                         user_email:
 *                           type: string
 *                           example: "jane.doe@example.com"
 *                         user_avatar:
 *                           type: string
 *                           nullable: true
 *                           example: "https://example.com/avatar.jpg"
 *                         user_role:
 *                           type: string
 *                           example: "staff"
 *                     tokens:
 *                       type: object
 *                       properties:
 *                         accessToken:
 *                           type: string
 *                           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                         refreshToken:
 *                           type: string
 *                           example: "dGhpc2lzcmVmcmVzaHRva2Vu..."
 *       400:
 *         description: Bad request (e.g., email already registered or keyStore error)
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /user/find/{id}:
 *   get:
 *     summary: Find a user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "64f0b5a9c3e2e1234567890a"
 *         description: User ID to fetch
 *     responses:
 *       200:
 *         description: User found successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Find user successfully"
 *                 metadata:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: "64f0b5a9c3e2e1234567890a"
 *                         name:
 *                           type: string
 *                           example: "John Doe"
 *                         email:
 *                           type: string
 *                           example: "john.doe@example.com"
 *                         birthday:
 *                           type: string
 *                           nullable: true
 *                           example: "2000-01-01"
 *                         avatar:
 *                           type: string
 *                           nullable: true
 *                           example: "https://example.com/avatar.jpg"
 *                         phone:
 *                           type: string
 *                           nullable: true
 *                           example: "+84123456789"
 *                         gender:
 *                           type: string
 *                           nullable: true
 *                           example: "male"
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *                           example: "2025-10-16T10:00:00.000Z"
 *                         point:
 *                           type: integer
 *                           example: 100
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /user/find-barber:
 *   get:
 *     summary: Find all free barbers optionally filtered by name and availability
 *     tags: [User]
 *     parameters:
 *       - in: query
 *         name: key
 *         schema:
 *           type: string
 *           example: "John"
 *         description: Optional search keyword to filter barber by name
 *       - in: query
 *         name: startTime
 *         schema:
 *           type: string
 *           format: date-time
 *           example: "2025-10-16T09:00:00.000Z"
 *         description: Start time to check barber availability
 *       - in: query
 *         name: endTime
 *         schema:
 *           type: string
 *           format: date-time
 *           example: "2025-10-16T12:00:00.000Z"
 *         description: End time to check barber availability
 *     responses:
 *       200:
 *         description: List of free barbers found successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Find user successfully"
 *                 metadata:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "64f0b5a9c3e2e1234567890a"
 *                       user_name:
 *                         type: string
 *                         example: "John Barber"
 *                       user_email:
 *                         type: string
 *                         example: "john.barber@example.com"
 *                       user_avatar:
 *                         type: string
 *                         nullable: true
 *                         example: "https://example.com/avatar.jpg"
 *                       user_role:
 *                         type: string
 *                         example: "staff"
 *                       user_gender:
 *                         type: string
 *                         nullable: true
 *                         example: "male"
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /user/find-receptionist:
 *   get:
 *     summary: Get all receptionists
 *     tags: [User]
 *     responses:
 *       200:
 *         description: List of receptionists found successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Find receptionist successfully"
 *                 metadata:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "64f0b5a9c3e2e1234567890a"
 *                       user_name:
 *                         type: string
 *                         example: "Jane Receptionist"
 *                       user_email:
 *                         type: string
 *                         example: "jane.receptionist@example.com"
 *                       user_avatar:
 *                         type: string
 *                         nullable: true
 *                         example: "https://example.com/avatar.jpg"
 *                       user_role:
 *                         type: string
 *                         example: "receptionist"
 *                       user_gender:
 *                         type: string
 *                         nullable: true
 *                         example: "female"
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /user/barber:
 *   get:
 *     summary: Get all barbers
 *     tags: [User]
 *     responses:
 *       200:
 *         description: List of barbers found successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Find all barber successfully"
 *                 metadata:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "64f0b5a9c3e2e1234567890a"
 *                       user_name:
 *                         type: string
 *                         example: "John Barber"
 *                       user_email:
 *                         type: string
 *                         example: "john.barber@example.com"
 *                       user_avatar:
 *                         type: string
 *                         nullable: true
 *                         example: "https://example.com/avatar.jpg"
 *                       user_role:
 *                         type: string
 *                         example: "staff"
 *                       user_gender:
 *                         type: string
 *                         nullable: true
 *                         example: "male"
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /user/:
 *   get:
 *     summary: Get all users, optionally filtered by name
 *     tags: [User]
 *     parameters:
 *       - in: query
 *         name: key
 *         schema:
 *           type: string
 *           example: "John"
 *         description: Optional search keyword to filter users by name
 *     responses:
 *       200:
 *         description: List of users found successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Find user successfully"
 *                 metadata:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "64f0b5a9c3e2e1234567890a"
 *                       user_name:
 *                         type: string
 *                         example: "John Doe"
 *                       user_email:
 *                         type: string
 *                         example: "john.doe@example.com"
 *                       user_avatar:
 *                         type: string
 *                         nullable: true
 *                         example: "https://example.com/avatar.jpg"
 *                       user_role:
 *                         type: string
 *                         example: "user"
 *                       user_gender:
 *                         type: string
 *                         nullable: true
 *                         example: "male"
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /user/{id}/{userID}:
 *   delete:
 *     summary: Delete a user by ID (authorization required)
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "64f0b5a9c3e2e1234567890b"
 *         description: ID of the user to delete
 *       - in: path
 *         name: userID
 *         required: true
 *         schema:
 *           type: string
 *           example: "64f0b5a9c3e2e1234567890a"
 *         description: ID of the user performing the delete (must be admin or receptionist)
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Delete user successfully"
 *                 metadata:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "64f0b5a9c3e2e1234567890b"
 *                     user_name:
 *                       type: string
 *                       example: "John Doe"
 *                     user_email:
 *                       type: string
 *                       example: "john.doe@example.com"
 *                     user_role:
 *                       type: string
 *                       example: "staff"
 *                     deletedBy:
 *                       type: string
 *                       example: "64f0b5a9c3e2e1234567890a"
 *       404:
 *         description: User not found or authorization failure
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /user/point:
 *   put:
 *     summary: Update user points (increment or decrement)
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userID
 *               - point
 *             properties:
 *               userID:
 *                 type: string
 *                 example: "64f0b5a9c3e2e1234567890a"
 *                 description: ID of the user whose points will be updated
 *               point:
 *                 type: integer
 *                 example: 50
 *                 description: Number of points to add (positive) or subtract (negative)
 *     responses:
 *       200:
 *         description: User points updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Update point successfully"
 *                 metadata:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "64f0b5a9c3e2e1234567890a"
 *                     user_name:
 *                       type: string
 *                       example: "John Doe"
 *                     user_email:
 *                       type: string
 *                       example: "john.doe@example.com"
 *                     user_point:
 *                       type: integer
 *                       example: 150
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /user/restore-password:
 *   post:
 *     summary: Restore or change user password
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - new_password
 *             properties:
 *               email:
 *                 type: string
 *                 example: "john.doe@example.com"
 *                 description: Email of the user whose password will be changed
 *               new_password:
 *                 type: string
 *                 example: "newStrongPassword123"
 *                 description: New password for the user
 *     responses:
 *       200:
 *         description: Password changed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Change password successfully"
 *                 metadata:
 *                   type: integer
 *                   example: 1
 *                   description: Number of documents modified (1 = success, 0 = not updated)
 *       400:
 *         description: User not registered
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /user/logout:
 *   post:
 *     summary: Logout user and remove stored keys
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               keyStore:
 *                 type: object
 *                 description: Key store object containing `_id` of the tokens to remove
 *                 example:
 *                   _id: "64f0b5a9c3e2e1234567890a"
 *     responses:
 *       200:
 *         description: Logout successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Logout successfully"
 *                 metadata:
 *                   type: object
 *                   nullable: true
 *                   description: Result of key removal operation
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /user/change-password:
 *   post:
 *     summary: Change user password with current password verification
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - new_password
 *             properties:
 *               email:
 *                 type: string
 *                 example: "john.doe@example.com"
 *                 description: Email of the user
 *               password:
 *                 type: string
 *                 example: "oldPassword123"
 *                 description: Current password of the user
 *               new_password:
 *                 type: string
 *                 example: "newStrongPassword456"
 *                 description: New password to replace the current one
 *     responses:
 *       200:
 *         description: Password changed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Change password successfully"
 *                 metadata:
 *                   type: integer
 *                   example: 1
 *                   description: Number of documents modified (1 = success, 0 = not updated)
 *       400:
 *         description: User not registered
 *       401:
 *         description: Authentication failed (wrong current password)
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /user/update:
 *   post:
 *     summary: Update user information
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userID
 *             properties:
 *               userID:
 *                 type: string
 *                 example: "64f0b5a9c3e2e1234567890a"
 *                 description: ID of the user to update
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *                 description: Updated user name
 *               email:
 *                 type: string
 *                 example: "john.doe@example.com"
 *                 description: Updated user email
 *               birthday:
 *                 type: string
 *                 format: date
 *                 nullable: true
 *                 example: "1990-05-15"
 *                 description: Updated user birthday
 *               phone:
 *                 type: string
 *                 nullable: true
 *                 example: "+84123456789"
 *                 description: Updated user phone number
 *               gender:
 *                 type: string
 *                 nullable: true
 *                 example: "male"
 *                 description: Updated user gender
 *               avatar:
 *                 type: string
 *                 nullable: true
 *                 example: "https://example.com/avatar.jpg"
 *                 description: Updated user avatar URL
 *     responses:
 *       200:
 *         description: User information updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Update information successfully"
 *                 metadata:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "64f0b5a9c3e2e1234567890a"
 *                     user_name:
 *                       type: string
 *                       example: "John Doe"
 *                     user_email:
 *                       type: string
 *                       example: "john.doe@example.com"
 *                     user_birthday:
 *                       type: string
 *                       format: date
 *                       nullable: true
 *                       example: "1990-05-15"
 *                     user_phone:
 *                       type: string
 *                       nullable: true
 *                       example: "+84123456789"
 *                     user_gender:
 *                       type: string
 *                       nullable: true
 *                       example: "male"
 *                     user_avatar:
 *                       type: string
 *                       nullable: true
 *                       example: "https://example.com/avatar.jpg"
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /user/refresh-token:
 *   post:
 *     summary: Refresh JWT tokens using refresh token
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *               - user
 *               - keyStore
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 description: Refresh token to be exchanged
 *               user:
 *                 type: object
 *                 properties:
 *                   user_id:
 *                     type: string
 *                     example: "64f0b5a9c3e2e1234567890a"
 *                   email:
 *                     type: string
 *                     example: "john.doe@example.com"
 *               keyStore:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "64f0b5a9c3e2e1234567890b"
 *                   publicKey:
 *                     type: string
 *                     example: "publicKeyExample"
 *                   privateKey:
 *                     type: string
 *                     example: "privateKeyExample"
 *                   refreshToken:
 *                     type: string
 *                     example: "currentRefreshToken"
 *                   refreshTokenUsed:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ["usedRefreshToken1", "usedRefreshToken2"]
 *     responses:
 *       200:
 *         description: Tokens refreshed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Refresh token successfully"
 *                 metadata:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         user_id:
 *                           type: string
 *                           example: "64f0b5a9c3e2e1234567890a"
 *                         email:
 *                           type: string
 *                           example: "john.doe@example.com"
 *                     tokens:
 *                       type: object
 *                       properties:
 *                         accessToken:
 *                           type: string
 *                           example: "newAccessTokenExample"
 *                         refreshToken:
 *                           type: string
 *                           example: "newRefreshTokenExample"
 *       403:
 *         description: Refresh token invalid or already used (re-login required)
 *       401:
 *         description: User not registered
 *       500:
 *         description: Internal server error
 */
