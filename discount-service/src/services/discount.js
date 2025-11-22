const DiscountModel = require("../models/Discount");
const { BadRequestError, NotFoundError } = require("../core/error-response");
const axios = require("axios");

const USER_SERVICE_BASE_URL =
  process.env.USER_SERVICE_BASE_URL || "http://localhost:5001/api/v1";

async function fetchUser(userId) {
  try {
    const res = await axios.get(`${USER_SERVICE_BASE_URL}/find/${userId}`);
    return res.data.data; // tùy cấu trúc
  } catch (err) {
    return null;
  }
}

class DiscountService {
  async getAllDiscounts() {
    const now = new Date();
    const discounts = await DiscountModel.find({
      is_active: true,
    });

    const result = [];

    for (const d of discounts) {
      let userInfo = null;
      if (d.assigned_user) {
        userInfo = await fetchUser(d.assigned_user);
      }

      result.push({
        ...d.toObject(),
        assigned_user: userInfo,
      });
    }

    // sort: còn hạn lên trên, hết hạn xuống dưới
    result.sort((a, b) => {
      const aExpired = a.end_date < now;
      const bExpired = b.end_date < now;

      if (aExpired === bExpired) return 0; // cùng trạng thái
      return aExpired ? 1 : -1; // hết hạn => xuống dưới
    });

    return result;
  }

  async getDiscountOfUser(user_id) {
    const now = new Date();

    const discounts = await DiscountModel.find({
      is_active: true,
      start_date: { $lte: now },
      end_date: { $gte: now },
      $or: [{ assigned_user: null }, { assigned_user: user_id }],
    });

    const result = [];

    for (const d of discounts) {
      if (d.usage_limit > d.used_count) {
        let userInfo = null;

        if (d.assigned_user) {
          userInfo = await fetchUser(d.assigned_user);
        }

        result.push({
          ...d.toObject(),
          assigned_user: userInfo,
        });
      }
    }

    return result;
  }

  async createDiscount(payload) {
    const { code, percentage, amount } = payload;

    if (!code || (percentage == null && amount == null)) {
      throw new BadRequestError("Missing required fields");
    }

    return await DiscountModel.create(payload);
  }

  async updateDiscount(discount_id, payload) {
    const discount = await DiscountModel.findById(discount_id);
    if (!discount) throw new NotFoundError("Discount not found");

    Object.assign(discount, payload);
    return await discount.save();
  }

  async applyDiscount(code, user_id) {
    const now = new Date();

    const discount = await DiscountModel.findOne({ code });

    if (!discount || !discount.is_active) {
      throw new NotFoundError("Discount code not valid or inactive");
    }

    if (discount.start_date && now < discount.start_date) {
      throw new BadRequestError("Discount not started yet");
    }

    if (discount.end_date && now > discount.end_date) {
      throw new BadRequestError("Discount expired");
    }

    if (
      discount.usage_limit != null &&
      discount.used_count >= discount.usage_limit
    ) {
      throw new BadRequestError("Discount usage limit reached");
    }

    // Check if it is a specfific discount of an user
    if (
      discount.assigned_user &&
      discount.assigned_user.toString() !== user_id.toString()
    ) {
      console.log("Compare", discount.assigned_user.toString(), user_id.toString());
      throw new BadRequestError("You are not eligible to use this discount");
    }

    discount.used_count += 1;
    await discount.save();

    return discount;
  }

  async delete(id) {
    return await DiscountModel.deleteOne({ _id: id });
  }
}

module.exports = new DiscountService();
