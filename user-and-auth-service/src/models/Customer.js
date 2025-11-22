const { Schema, model } = require("mongoose");

const DOCUMENT_NAME = "Customer";
const COLLECTION_NAME = "Customers";

const customerSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    customer_point: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

module.exports = model(DOCUMENT_NAME, customerSchema);
