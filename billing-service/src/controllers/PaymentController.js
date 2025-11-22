const paymentService = require("../services/payment");

class AppointmentController {
  async createMomoPayment(req, res, next) {
    return res
      .status(200)
      .json(await paymentService.createMomoPayment(req.body));
  }
}

module.exports = new AppointmentController();
