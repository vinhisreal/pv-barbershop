const { Schema, model } = require("mongoose");

const DOCUMENT_NAME = "Review";
const COLLECTION_NAME = "Reviews";

const reviewSchema = new Schema(
  {
    customer: { type: Schema.Types.String, required: true },
    barber: { type: Schema.Types.ObjectId, required: true },
    service: [{ type: Schema.Types.ObjectId, ref: "Service", required: true }],
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

module.exports = model(DOCUMENT_NAME, reviewSchema);
