const NotificationModel = require("../models/Notification");
const { NotFoundError } = require("../core/error-response");

class NotificationService {
  async createNotification(payload, io) {
    const notification = await NotificationModel.create(payload);

    io.to(payload.user.toString()).emit("new_notification", notification);
    console.log("io", io, "user", payload.user.toString());

    return notification;
  }

  async getNotificationsByUser(userId) {
    return await NotificationModel.find({ user: userId }).sort({
      createdAt: -1,
    });
  }

  async markAsRead(notificationId) {
    const notification = await NotificationModel.findById(notificationId);
    if (!notification) throw new NotFoundError("Notification not found");

    notification.is_read = true;
    return await notification.save();
  }

  async deleteNotification(id) {
    return await NotificationModel.deleteOne({ _id: id });
  }

  async deleteAllNotification(id) {
    return await NotificationModel.deleteMany({ user: id });
  }
}

module.exports = new NotificationService();
