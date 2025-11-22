const { Schema, model } = require("mongoose");

const DOCUMENT_NAME = "Gift";
const COLLECTION_NAME = "Gifts";

const giftSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    required_points: { type: Number, required: true },
    quantity: { type: Number, default: 0 },
    is_active: { type: Boolean, default: true },
    start_date: { type: Date },
    end_date: { type: Date },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

module.exports = model(DOCUMENT_NAME, giftSchema);
