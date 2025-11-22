const ReviewModel = require("../models/Review");
const { NotFoundError, BadRequestError } = require("../core/error-response");

class ReviewService {
  async createReview({ customer, barber, service, rating, comment }) {
    if (!customer || !barber || !service?.length || !rating) {
      throw new BadRequestError("Missing required information.");
    }

    const newReview = await ReviewModel.create({
      customer,
      barber,
      service,
      rating,
      comment,
    });

    return newReview;
  }

  async getAllReviews() {
    const reviews = await ReviewModel.find().populate("barber service");
    return reviews;
  }

  async getReviewsByBarber(barberID) {
    if (!barberID) throw new BadRequestError("Barber ID not found.");

    const reviews = await ReviewModel.find({ barber: barberID }).populate(
      "service"
    );

    return reviews;
  }
}

module.exports = new ReviewService();
