const { Schema, model } = require("mongoose");

const DOCUMENT_NAME = "LookbookImage";
const COLLECTION_NAME = "LookbookImages";

const lookbookImageSchema = new Schema(
  {
    url: { type: String, required: true },
    link: { type: String },
    active: { type: Boolean, default: false },
    collection: { type: Schema.Types.ObjectId, ref: "LookbookCollection" },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

module.exports = model(DOCUMENT_NAME, lookbookImageSchema);
