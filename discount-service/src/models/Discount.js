const { Schema, model, Types } = require("mongoose");

const DOCUMENT_NAME = "Discount";
const COLLECTION_NAME = "Discounts";

const discountSchema = new Schema(
  {
    code: { type: String, required: true, unique: true },
    description: { type: String },
    percentage: { type: Number, min: 0, max: 100 },
    amount: { type: Number },
    is_active: { type: Boolean, default: true },
    start_date: { type: Date },
    end_date: { type: Date },
    usage_limit: { type: Number },
    used_count: { type: Number, default: 0 },

    // 🎁 nếu chỉ dành riêng cho một user
    assigned_user: { type: Types.ObjectId, ref: "User", default: null },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

module.exports = model(DOCUMENT_NAME, discountSchema);
