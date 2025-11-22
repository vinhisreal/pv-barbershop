const siteRouter = require("./site");
const notificationRouter = require("./notification");
const otpRouter = require("./otp");
const mailRouter = require("./mail");

function route(app) {
  app.use("/api/v1/otp/", otpRouter);
  app.use("/api/v1/notification/", notificationRouter);
  app.use("/api/v1/mail", mailRouter);
  app.use("/", siteRouter);
}

module.exports = route;
