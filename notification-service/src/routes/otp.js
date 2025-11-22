const express = require("express");
const router = express.Router();
const asyncHandler = require("../helpers/async-handler");
const otpController = require("../controllers/OtpController");

router.post("/send", asyncHandler(otpController.sendOtp));

router.post("/verify", asyncHandler(otpController.verifyOtp));

module.exports = router;
