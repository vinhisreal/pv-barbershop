const { Schema, model } = require("mongoose");

const DOCUMENT_NAME = "Otp";
const COLLECTION_NAME = "Otps";

const otpSchema = new Schema(
  {
    email: { type: String, required: true },
    otp: { type: String, required: true },
    expiresAt: { type: Date, required: true },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

module.exports = model(DOCUMENT_NAME, otpSchema);
