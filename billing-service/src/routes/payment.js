const express = require("express");
const router = express.Router();
const asyncHandler = require("../helpers/async-handler");
const paymentController = require("../controllers/PaymentController");
router.post("/momo", asyncHandler(paymentController.createMomoPayment));

module.exports = router;
