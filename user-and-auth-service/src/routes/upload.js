const express = require("express");
const router = express.Router();

const UploadController = require("../controllers/UploadController");
const { uploadDisk } = require("../configs/multer");
const asyncHandler = require("../helpers/async-handler");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post(
  "/image",
  upload.single("file"),
  asyncHandler(UploadController.uploadThumb)
);

module.exports = router;
