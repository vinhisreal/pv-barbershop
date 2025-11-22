const { Schema, model } = require("mongoose");

const DOCUMENT_NAME = "Admin";
const COLLECTION_NAME = "Admins";

const barberSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

module.exports = model(DOCUMENT_NAME, barberSchema);
