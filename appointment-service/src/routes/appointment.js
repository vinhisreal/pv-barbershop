const express = require("express");
const router = express.Router();
const { authentication } = require("../auth/utils");
const asyncHandler = require("../helpers/async-handler");
const appointmentController = require("../controllers/AppointmentController");
router.post("/create", asyncHandler(appointmentController.create));
router.get("/get-all", asyncHandler(appointmentController.getAll));
router.get("/busy", asyncHandler(appointmentController.getBusyAppointments));
router.get("/:id", asyncHandler(appointmentController.get));
router.get(
  "/barber/:barberId/filter",
  asyncHandler(appointmentController.getByBarberAndStatus)
);

router.put("/:id/status", asyncHandler(appointmentController.updateStatus));

router.put("/:id/proof", asyncHandler(appointmentController.updateProof));

router.get("/user/:userID", asyncHandler(appointmentController.getByUser));
router.get(
  "/barber/:barberId",
  asyncHandler(appointmentController.getByBarber)
);
router.put("/:id", asyncHandler(appointmentController.update));
router.delete("/:id", asyncHandler(appointmentController.delete));

module.exports = router;
