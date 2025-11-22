const giftService = require("../services/gift");
const { CREATED, SuccessResponse } = require("../core/success-response");

class GiftController {
  async createGift(req, res, next) {
    new CREATED({
      message: "Gift created successfully",
      metadata: await giftService.createGift(req.body),
    }).send(res);
  }

  async updateGift(req, res, next) {
    new SuccessResponse({
      message: "Gift updated successfully",
      metadata: await giftService.updateGift(req.params.id, req.body),
    }).send(res);
  }

  async getAllGifts(req, res, next) {
    new SuccessResponse({
      message: "Active gift list",
      metadata: await giftService.getAllGifts(),
    }).send(res);
  }

  async redeemGift(req, res, next) {
    const { gift_id, user_points, user_id } = req.body;

    new SuccessResponse({
      message: "Gift redeemed successfully",
      metadata: await giftService.redeemGift({ user_id, gift_id, user_points }),
    }).send(res);
  }

  async getUserRedemptions(req, res, next) {
    const user_id = req.query.userID;

    new SuccessResponse({
      message: "User's redeemed gifts",
      metadata: await giftService.getUserRedemptions(user_id),
    }).send(res);
  }

  async getRedemptions(req, res, next) {
    new SuccessResponse({
      message: "User's redeemed gifts",
      metadata: await giftService.getRedemptions(),
    }).send(res);
  }

  async delete(req, res, next) {
    new SuccessResponse({
      message: "Gifts deleted",
      metadata: await giftService.delete(req.params.id),
    }).send(res);
  }

  async completeRedemption(req, res, next) {
    new SuccessResponse({
      message: "Redemption completed",
      metadata: await giftService.completeRedemption(req.params.id),
    }).send(res);
  }
}

module.exports = new GiftController();
