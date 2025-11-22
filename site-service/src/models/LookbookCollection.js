const { Schema, model } = require("mongoose");

const DOCUMENT_NAME = "LookbookCollection";
const COLLECTION_NAME = "LookbookCollections";

const lookbookCollectionSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: false },
    active: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

module.exports = model(DOCUMENT_NAME, lookbookCollectionSchema);
