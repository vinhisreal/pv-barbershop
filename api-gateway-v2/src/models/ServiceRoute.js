const { Schema, model } = require("mongoose");

const ServiceRouteSchema = new Schema(
  {
    path: { type: String, required: true }, 
    target: { type: String, required: true }, // origin only
  },
  { timestamps: true, collection: "serviceroutes" }
);

// Chỉ định index 1 lần ở đây
ServiceRouteSchema.index({ path: 1 }, { unique: true });

module.exports = model("ServiceRoute", ServiceRouteSchema);
