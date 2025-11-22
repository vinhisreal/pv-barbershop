/**
 * @swagger
 * tags:
 *   name: Upload
 *   description: File upload management
 */
/**
 * @swagger
 * /upload/image:
 *   post:
 *     summary: Upload an image and get full URL and thumbnail
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
 *                 description: Image file to upload
 *               folderName:
 *                 type: string
 *                 example: "pvbarbershop"
 *                 description: Folder name in cloud storage
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
 *                   example: "https://res.cloudinary.com/demo/image/upload/v1697500000/pvbarbershop/image.jpg"
 *                   description: Full image URL
 *                 thumb_url:
 *                   type: string
 *                   example: "https://res.cloudinary.com/demo/image/upload/h_100,w_100/v1697500000/pvbarbershop/image.jpg"
 *                   description: Thumbnail URL (100x100)
 *       400:
 *         description: File missing
 *       500:
 *         description: Internal server error
 */
