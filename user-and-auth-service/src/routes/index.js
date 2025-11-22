const siteRouter = require("./site");
const userRouter = require("./user");
const uploadRouter = require("./upload");
const salaryRouter = require("./salary");
const userRoleRouter = require("./user-role");

function route(app) {
  app.use("/api/v1/user/", userRouter);
  app.use("/api/v1/upload/", uploadRouter);
  app.use("/api/v1/user-role/", userRoleRouter);
  app.use("/api/v1/salary/", salaryRouter);
  app.use("/", siteRouter);
}

module.exports = route;
