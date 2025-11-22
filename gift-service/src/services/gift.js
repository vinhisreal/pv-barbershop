const GiftModel = require("../models/Gift");
const RedemptionModel = require("../models/Redemption");
const { BadRequestError, NotFoundError } = require("../core/error-response");
const axios = require("axios");
const USER_SERVICE_URL = process.env.USER_SERVICE_BASE_URL;

class GiftService {
  async getAllGifts() {
    const now = new Date();
    return await GiftModel.find({
      is_active: true,
      start_date: { $lte: now },
      end_date: { $gte: now },
    });
  }

  async createGift(payload) {
    const { name, required_points, quantity } = payload;

    if (!name || required_points == null || quantity == null) {
      throw new BadRequestError("Missing required fields");
    }

    return await GiftModel.create(payload);
  }

  async updateGift(gift_id, payload) {
    const gift = await GiftModel.findById(gift_id);
    if (!gift) throw new NotFoundError("Gift not found");

    Object.assign(gift, payload);
    return await gift.save();
  }

  async redeemGift({ user_id, gift_id }) {
    const gift = await GiftModel.findById(gift_id);
    if (!gift || !gift.is_active) throw new NotFoundError("Gift not found");

    const now = new Date();

    if (gift.start_date && now < gift.start_date)
      throw new BadRequestError("Gift is not available yet");

    if (gift.end_date && now > gift.end_date)
      throw new BadRequestError("Gift has expired");

    if (gift.quantity <= 0) throw new BadRequestError("Gift is out of stock");

    let userInfo;
    try {
      userInfo = await axios.get(`${USER_SERVICE_URL}/user/find/${user_id}`);
    } catch (err) {
      throw new BadRequestError("User service unavailable");
    }

    const userPoint = userInfo.data.metadata.user.point;
    if (userPoint < gift.required_points)
      throw new BadRequestError("Not enough points");

    // 2. Trừ điểm user bằng UserService
    try {
      await axios.put(`${USER_SERVICE_URL}/user/point`, {
        userID: user_id,
        point: -gift.required_points,
      });
    } catch (err) {
      throw new BadRequestError("Failed to deduct user points");
    }

    // 3. Trừ số lượng gift
    gift.quantity -= 1;
    await gift.save();

    // 4. Lưu redemption
    const redemption = await RedemptionModel.create({
      user: user_id,
      gift: gift_id,
      points_used: gift.required_points,
    });

    return { redemption };
  }

  async getUserRedemptions(user_id) {
    // Lấy toàn bộ redemption theo user
    const redemptions = await RedemptionModel.find({ user: user_id }).populate(
      "gift"
    );

    // Gọi User Service để lấy thông tin user
    let userInfo;
    try {
      const res = await axios.get(`${USER_SERVICE_URL}/user/find/${user_id}`);
      userInfo = res.data.metadata.user;
    } catch (err) {
      throw new BadRequestError("User service unavailable");
    }

    // Gắn user info vào từng redemption
    return redemptions.map((re) => ({
      ...re.toObject(),
      user: userInfo,
    }));
  }

  async getRedemptions() {
    const redemptions = await RedemptionModel.find().populate("gift");

    // Lấy danh sách userIds (không trùng)
    const userIds = [...new Set(redemptions.map((r) => r.user.toString()))];

    // Gọi UserService để lấy thông tin từng user
    const userMap = {};

    for (const id of userIds) {
      try {
        const res = await axios.get(`${USER_SERVICE_URL}/user/find/${id}`);
        userMap[id] = res.data.metadata.user;
      } catch (err) {
        userMap[id] = null;
      }
    }

    // Gắn user info vào redemption
    return redemptions.map((re) => ({
      ...re.toObject(),
      user: userMap[re.user.toString()] || null,
    }));
  }

  async delete(id) {
    return await GiftModel.deleteOne({ _id: id });
  }

  async completeRedemption(id) {
    return await RedemptionModel.deleteOne({ _id: id });
  }
}

module.exports = new GiftService();
