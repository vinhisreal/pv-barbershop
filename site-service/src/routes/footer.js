const express = require("express");
const router = express.Router();
const asyncHandler = require("../helpers/async-handler");
const footerController = require("../controllers/FooterController");

router.post("/image", asyncHandler(footerController.createImage));
router.post("/collection", asyncHandler(footerController.createCollection));
router.get("/images", asyncHandler(footerController.getImages));
router.get("/collections", asyncHandler(footerController.getCollections));
router.get(
  "/images/collection/:id",
  asyncHandler(footerController.getImagesByCollection)
);
router.put(
  "/collection/:id/active",
  asyncHandler(footerController.setCollectionActive)
);
router.put("/image/:id/active", asyncHandler(footerController.setImageActive));
router.get("/collections/active", footerController.getActiveFooterCollection);

module.exports = router;
