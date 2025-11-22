const siteRouter = require("./site");
const footerRouter = require("./footer");
const lookbookRouter = require("./lookbook");

function route(app) {
  app.use("/api/v1/footer/", footerRouter);
  app.use("/api/v1/lookbook/", lookbookRouter);
  app.use("/", siteRouter);
}

module.exports = route;
