const express = require("express");
const router = express.Router();
const asyncHandler = require("../helpers/async-handler");
const salaryController = require("../controllers/SalaryController");

router.get("/", asyncHandler(salaryController.getAll));

module.exports = router;
