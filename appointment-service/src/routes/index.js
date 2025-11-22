const siteRouter = require("./site");
const uploadRouter = require("./upload");
const appointmentRouter = require("./appointment");
const serviceRouter = require("./service");
const reviewRouter = require("./review");
const statisticRouter = require("./statistic");

function route(app) {
  app.use("/api/v1/upload/", uploadRouter);
  app.use("/api/v1/appointment/", appointmentRouter);
  app.use("/api/v1/service/", serviceRouter);
  app.use("/api/v1/review/", reviewRouter);
  app.use("/api/v1/statistic/", statisticRouter);
  app.use("/", siteRouter);
}

module.exports = route;
