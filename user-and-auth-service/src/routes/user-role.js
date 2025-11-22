const express = require("express");
const router = express.Router();
const asyncHandler = require("../helpers/async-handler");
const userRoleController = require("../controllers/UserRoleController");
const { authentication } = require("../auth/utils");

// Public:
router.get("/", asyncHandler(userRoleController.getAll));
router.get("/:id", asyncHandler(userRoleController.getById));
router.post("/", asyncHandler(userRoleController.create));
router.put("/:id", asyncHandler(userRoleController.update));

// Require login:
router.use(authentication);
router.delete("/:id", asyncHandler(userRoleController.delete));

module.exports = router;
