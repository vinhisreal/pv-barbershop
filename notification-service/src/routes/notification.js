const express = require("express");
const router = express.Router();
const asyncHandler = require("../helpers/async-handler");
const notificationController = require("../controllers/NotificationController");

router.post("/create", asyncHandler(notificationController.createNotification));
router.get(
  "/list/:userId",
  asyncHandler(notificationController.getNotificationsByUser)
);
router.put("/:id/mark-read", asyncHandler(notificationController.markAsRead));
router.delete(
  "/delete-all/:userID",
  asyncHandler(notificationController.deleteAllNotificationOfUser)
);
router.delete("/:id", asyncHandler(notificationController.deleteNotification));

module.exports = router;
