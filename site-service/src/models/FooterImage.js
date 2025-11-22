const { Schema, model } = require("mongoose");

const DOCUMENT_NAME = "FooterImage";
const COLLECTION_NAME = "FooterImages";

const footerImageSchema = new Schema(
  {
    url: { type: String, required: true },
    link: { type: String },
    active: { type: Boolean, default: false },
    collection: { type: Schema.Types.ObjectId, ref: "FooterCollection" },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

module.exports = model(DOCUMENT_NAME, footerImageSchema);
