const express = require("express");
const router = express.Router();
const asyncHandler = require("../helpers/async-handler");
const discountController = require("../controllers/DiscountController");

router.post("/create", asyncHandler(discountController.createDiscount));
router.put("/:id/update", asyncHandler(discountController.updateDiscount));
router.get("/list", asyncHandler(discountController.getAllDiscounts));
router.post("/apply", asyncHandler(discountController.applyDiscount));
router.get("/user-discount/:id", asyncHandler(discountController.getUserDiscounts));
router.delete("/:id", asyncHandler(discountController.delete));

module.exports = router;
