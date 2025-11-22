const { Schema, model } = require("mongoose");

const DOCUMENT_NAME = "UserRole";
const COLLECTION_NAME = "UserRoles";

const userRoleSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    code: { type: Number, required: true, unique: true },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

module.exports = {
  UserRoleModel: model(DOCUMENT_NAME, userRoleSchema),
};
