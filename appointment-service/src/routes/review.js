const express = require("express");
const router = express.Router();
const { authentication } = require("../auth/utils");
const asyncHandler = require("../helpers/async-handler");
const reviewController = require("../controllers/ReviewController");

// router.use(authentication);
router.post("/create", asyncHandler(reviewController.create));
router.get("/barber/:barberId", asyncHandler(reviewController.getByBarber));
// router.get("/service/:serviceId", asyncHandler(reviewController.getAll));
router.get("/", asyncHandler(reviewController.getAll));

module.exports = router;
