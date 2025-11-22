const { Schema, model } = require("mongoose");

const DOCUMENT_NAME = "Appointment";
const COLLECTION_NAME = "Appointments";

const appointmentSchema = new Schema(
  {
    customer: { type: Schema.Types.ObjectId, default: null },
    customer_name: { type: Schema.Types.String },
    phone_number: { type: Schema.Types.Number, require: true },
    barber: { type: Schema.Types.ObjectId, default: null },
    service: [{ type: Schema.Types.ObjectId, ref: "Service", required: true }],
    appointment_start: { type: Date, required: true },
    appointment_end: { type: Date, required: true },
    complete_picture: { type: String },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "canceled"],
      default: "pending",
    },
    notes: { type: String },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

module.exports = model(DOCUMENT_NAME, appointmentSchema);
