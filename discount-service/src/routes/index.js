const siteRouter = require("./site");
const discountRouter = require("./discount");

function route(app) {
  app.use("/api/v1/discount/", discountRouter);
  app.use("/", siteRouter);
}

module.exports = route;
