const { Schema, model } = require("mongoose");

const DOCUMENT_NAME = "Invoice";
const COLLECTION_NAME = "Invoices";

const invoiceSchema = new Schema(
  {
    appointment: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    total_amount: { type: Number, required: true },
    payment_method: {
      type: String,
      enum: ["cash", "momo"],
      required: true,
    },
    status: {
      type: String,
      enum: ["paid", "unpaid"],
      default: "unpaid",
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

module.exports = model(DOCUMENT_NAME, invoiceSchema);
