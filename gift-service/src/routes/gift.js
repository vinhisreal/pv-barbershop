const express = require("express");
const router = express.Router();
const asyncHandler = require("../helpers/async-handler");
const giftController = require("../controllers/GiftController");


router.post("/create", asyncHandler(giftController.createGift));
router.put("/:id/update", asyncHandler(giftController.updateGift));
router.get("/list", asyncHandler(giftController.getAllGifts));
router.post("/redeem", asyncHandler(giftController.redeemGift));
router.get("/redemptions", asyncHandler(giftController.getUserRedemptions));
router.get("/all-redemption", asyncHandler(giftController.getRedemptions));
router.delete(
  "/redemption/:id",
  asyncHandler(giftController.completeRedemption)
);
router.delete("/:id", asyncHandler(giftController.delete));

module.exports = router;
