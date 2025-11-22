const discountService = require("../services/discount");
const { CREATED, SuccessResponse } = require("../core/success-response");

class DiscountController {
  async createDiscount(req, res, next) {
    new CREATED({
      message: "Discount created successfully",
      metadata: await discountService.createDiscount(req.body),
    }).send(res);
  }

  async updateDiscount(req, res, next) {
    new SuccessResponse({
      message: "Discount updated successfully",
      metadata: await discountService.updateDiscount(req.params.id, req.body),
    }).send(res);
  }

  async getAllDiscounts(req, res, next) {
    new SuccessResponse({
      message: "Valid discounts",
      metadata: await discountService.getAllDiscounts(),
    }).send(res);
  }

  async applyDiscount(req, res, next) {
    const { code, user_id } = req.body;

    new SuccessResponse({
      message: "Discount applied",
      metadata: await discountService.applyDiscount(code, user_id),
    }).send(res);
  }

  async getUserDiscounts(req, res, next) {
    const user_id = req.params.id;

    new SuccessResponse({
      message: "Discounts for user",
      metadata: await discountService.getDiscountOfUser(user_id),
    }).send(res);
  }

  async delete(req, res, next) {
    new SuccessResponse({
      message: "Discount deleted",
      metadata: await discountService.delete(req.params.id),
    }).send(res);
  }
}

module.exports = new DiscountController();
