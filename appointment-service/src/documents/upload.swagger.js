/**
 * @swagger
 * tags:
 *   name: Upload
 *   description: Upload API

 * /upload/image:
 *   post:
 *     summary: Upload image to Cloudinary
 *     tags: [Upload]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *               folderName:
 *                 type: string
 *                 example: pvbarbershop
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 img_url:
 *                   type: string
 *                   example: https://res.cloudinary.com/xxx/image/upload/demo.jpg
 *                 thumb_url:
 *                   type: string
 *                   example: https://res.cloudinary.com/xxx/image/upload/w_100,h_100/demo.jpg
 */
