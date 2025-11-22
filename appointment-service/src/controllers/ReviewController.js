const reviewService = require("../services/review");
const { CREATED, SuccessResponse } = require("../core/success-response");

class ReviewController {
  async create(req, res, next) {
    new CREATED({
      message: "Review submitted successfully",
      metadata: await reviewService.createReview(req.body),
    }).send(res);
  }

  async getAll(req, res, next) {
    new SuccessResponse({
      message: "All's reviews",
      metadata: await reviewService.getAllReviews(),
    }).send(res);
  }

  async getByBarber(req, res, next) {
    new SuccessResponse({
      message: "Barber's reviews",
      metadata: await reviewService.getReviewsByBarber(req.params.barberId),
    }).send(res);
  }

  // async getByService(req, res, next) {
  //   new SuccessResponse({
  //     message: "Service's reviews",
  //     metadata: await reviewService.getReviewsByService(req.params.serviceId),
  //   }).send(res);
  // }
}

module.exports = new ReviewController();
