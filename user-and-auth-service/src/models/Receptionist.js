const { Schema, model } = require("mongoose");

const DOCUMENT_NAME = "Receptionist";
const COLLECTION_NAME = "Receptionists";

const barberSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    day_joint: {
      type: Date,
      default: () => new Date(),
    },
    fired_by: {
      type: Schema.Types.ObjectId,
      ref: "User",
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
