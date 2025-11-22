const giftRouter = require("./gift");

function route(app) {
  app.use("/api/v1/gift/", giftRouter);
}

module.exports = route;
