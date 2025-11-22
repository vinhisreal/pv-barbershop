/**
* @swagger
* tags:
*   name: Salary
*   description: API for managing and retrieving staff salary information
*/
/**
 * @swagger
 * /salary:
 *   get:
 *     summary: Get calculated salaries for all staff
 *     tags: [Salary]
 *     description: |
 *       Retrieve the calculated salary details for all staff members for a specific month and year.  
 *       Both `month` and `year` query parameters are required.
 *     parameters:
 *       - in: query
 *         name: month
 *         required: true
 *         description: The month for which to calculate salaries (1–12).
 *         schema:
 *           type: integer
 *           example: 10
 *       - in: query
 *         name: year
 *         required: true
 *         description: The year for which to calculate salaries.
 *         schema:
 *           type: integer
 *           example: 2025
 *     responses:
 *       200:
 *         description: Salaries retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Salary for month 10/2025"
 *                 metadata:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       staff_id:
 *                         type: string
 *                         example: "6710b5a9c3e2e1234567890a"
 *                       staff_name:
 *                         type: string
 *                         example: "Nguyen Van A"
 *                       base_salary:
 *                         type: number
 *                         example: 5000000
 *                       bonus:
 *                         type: number
 *                         example: 500000
 *                       total_salary:
 *                         type: number
 *                         example: 5500000
 *                       month:
 *                         type: integer
 *                         example: 10
 *                       year:
 *                         type: integer
 *                         example: 2025
 *       400:
 *         description: Missing month or year query parameter
 *       500:
 *         description: Internal server error
 */
