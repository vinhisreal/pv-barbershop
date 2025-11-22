const express = require("express");
const router = express.Router();
const asyncHandler = require("../helpers/async-handler");
const lookbookController = require("../controllers/LookbookController");

router.post("/image", asyncHandler(lookbookController.createImage));
router.post("/collection", asyncHandler(lookbookController.createCollection));
router.get("/images", asyncHandler(lookbookController.getImages));
router.get("/collections", asyncHandler(lookbookController.getCollections));
router.put(
  "/collection/:id/active",
  asyncHandler(lookbookController.setCollectionActive)
);
router.put(
  "/image/:id/active",
  asyncHandler(lookbookController.setImageActive)
);
router.get(
  "/collections/active",
  asyncHandler(lookbookController.getActiveCollection)
);

module.exports = router;
