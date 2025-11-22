const { UserModel } = require("../../models/User");

const findByEmail = async ({ email }) => {
  return await UserModel.findOne({ user_email: email }).populate("user_role");
};

module.exports = {
  findByEmail,
};
