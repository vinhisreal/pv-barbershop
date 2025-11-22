const express = require("express");
const router = express.Router();

const MailController = require("../controllers/MailController");
const asyncHandler = require("../helpers/async-handler");

// Contact to admin
router.post("/contact", asyncHandler(MailController.sendContact));

// Redemption confirmation
router.post("/redemption", asyncHandler(MailController.sendRedemption));

// Generic sender
router.post("/send", asyncHandler(MailController.sendGeneric));

module.exports = router;
