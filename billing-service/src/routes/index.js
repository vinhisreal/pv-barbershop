const siteRouter = require("./site");
const invoiceRouter = require("./invoice");
const paymentRouter = require("./payment");

function route(app) {
  app.use("/api/v1/invoice/", invoiceRouter);
  app.use("/api/v1/payment/", paymentRouter);
  app.use("/", siteRouter);
}

module.exports = route;
