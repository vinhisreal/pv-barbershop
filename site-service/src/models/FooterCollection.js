const { Schema, model } = require("mongoose");

const DOCUMENT_NAME = "FooterCollection";
const COLLECTION_NAME = "FooterCollections";

const footerCollectionSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: false },
    active: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

module.exports = model(DOCUMENT_NAME, footerCollectionSchema);
