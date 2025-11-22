const { Schema, model } = require("mongoose");

const DOCUMENT_NAME = "Redemption";
const COLLECTION_NAME = "Redemptions";

const redemptionSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, required: true },
    gift: { type: Schema.Types.ObjectId, ref: "Gift", required: true },
    redeemed_at: { type: Date, default: Date.now },
    points_used: { type: Number, required: true },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

module.exports = model(DOCUMENT_NAME, redemptionSchema);
