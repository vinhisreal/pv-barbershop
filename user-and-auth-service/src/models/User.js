const { Schema, model } = require("mongoose");

const DOCUMENT_NAME = "User";
const COLLECTION_NAME = "Users";

var userSchema = new Schema(
  {
    user_name: {
      type: String,
      required: true,
    },
    user_email: {
      type: String,
      required: true,
    },
    user_avatar: {
      type: String,
      default: "",
    },
    user_password: {
      type: String,
      required: true,
    },
    user_birthday: {
      type: Date,
    },
    user_gender: {
      type: String,
      enum: ["male", "female", "unknown"],
      default: "unknown",
    },
    user_phone: {
      type: String,
      default: "",
    },
    user_role: {
      type: Schema.Types.ObjectId,
      ref: "UserRole",
      required: true,
    },
    user_point: {
      type: Number,
      default: 0,
    },
    deletedBy: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    user_highlight_images: {
      type: [String], // array URL ảnh
      default: [],
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

module.exports = {
  UserModel: model(DOCUMENT_NAME, userSchema),
};
