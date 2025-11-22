class SiteController {
  async welcome(req, res, next) {
    try {
      res.status(200).send({
        message: "Welcome to PV Barbershop!",
      });
    } catch (err) {
      res.send(err);
    }
  }
}

module.exports = new SiteController();
