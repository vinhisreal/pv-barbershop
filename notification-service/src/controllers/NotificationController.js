const notificationService = require("../services/notification");
const { CREATED, SuccessResponse } = require("../core/success-response");

class NotificationController {
  async createNotification(req, res, next) {
    const notification = await notificationService.createNotification(
      req.body,
      req.app.get("io")
    );

    new CREATED({
      message: "Notification created successfully",
      metadata: notification,
    }).send(res);
  }

  async getNotificationsByUser(req, res, next) {
    const userId = req.params.userId;

    new SuccessResponse({
      message: "User notifications",
      metadata: await notificationService.getNotificationsByUser(userId),
    }).send(res);
  }

  async markAsRead(req, res, next) {
    new SuccessResponse({
      message: "Notification marked as read",
      metadata: await notificationService.markAsRead(req.params.id),
    }).send(res);
  }

  async deleteNotification(req, res, next) {
    new SuccessResponse({
      message: "Notification deleted",
      metadata: await notificationService.deleteNotification(req.params.id),
    }).send(res);
  }

  async deleteAllNotificationOfUser(req, res, next) {
    new SuccessResponse({
      message: "Notification deleted",
      metadata: await notificationService.deleteAllNotification(
        req.params.userID
      ),
    }).send(res);
  }
}

module.exports = new NotificationController();
