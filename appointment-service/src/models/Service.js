const { Schema, model } = require("mongoose");

const DOCUMENT_NAME = "Service";
const COLLECTION_NAME = "Services";

const serviceSchema = new Schema(
  {
    service_name: { type: String, required: true },
    service_price: { type: Number, required: true },
    service_duration: { type: Number, required: true },
    service_description: { type: String },
    service_image: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

module.exports = model(DOCUMENT_NAME, serviceSchema);
