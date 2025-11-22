const express = require("express");
const router = express.Router();
const asyncHandler = require("../helpers/async-handler");
const serviceController = require("../controllers/ServiceController");

router.post("/create", asyncHandler(serviceController.create));
router.get("/all", asyncHandler(serviceController.getAll));
router.get("/:id", asyncHandler(serviceController.getById));
router.put("/:id", asyncHandler(serviceController.update));
router.delete("/:id", asyncHandler(serviceController.delete));

module.exports = router;
