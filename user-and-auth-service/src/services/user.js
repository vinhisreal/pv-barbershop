const { UserModel } = require("../models/User");
const AdminModel = require("../models/Admin");
const BarberModel = require("../models/Barber");
const CustomerModel = require("../models/Customer");
const ReceptionistModel = require("../models/Receptionist");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const keyTokenService = require("./key-token");
const { generatePairOfToken } = require("../auth/utils");
const { getInfoData } = require("../utils/index");
const { findByEmail } = require("../helpers/function/user");
const axios = require("axios");
const APPOINTMENT_SERVICE_URL =
  process.env.APPOINTMENT_SERVICE_URL || "http://localhost:5002";

const {
  BadRequestError,
  AuthFailureError,
  NotFoundError,
} = require("../core/error-response");
const { UserRoleModel } = require("../models/UserRole");

class UserService {
  signUp = async ({ name, email, password, isAdmin }) => {
    const role = await UserRoleModel.findOne({ code: isAdmin ? 0 : 3 }); // 0: admin, 3: customer
    if (!role) {
      throw new BadRequestError("Role không tồn tại");
    }
    // Step 1: Check the existence of email
    const foundUser = await UserModel.findOne({ user_email: email }).lean();
    if (foundUser) throw new BadRequestError("User is already registered");

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await UserModel.create({
      user_name: name,
      user_email: email,
      user_password: hashedPassword,
      user_role: role._id,
    });

    if (newUser) {
      if (role.code === 0) {
        await AdminModel.create({ user_id: newUser._id });
      } else if (role.code === 3) {
        await CustomerModel.create({
          user_id: newUser._id,
        });
      } else if (role.code === 1) {
        await ReceptionistModel.create({
          user_id: newUser._id,
        });
      } else if (role.code === 2) {
        await BarberModel.create({
          user_id: newUser._id,
        });
      }

      // Create privateKey, publicKey
      const privateKey = crypto.randomBytes(64).toString("hex");
      const publicKey = crypto.randomBytes(64).toString("hex");

      const keyStore = await keyTokenService.createKeyToken({
        user_id: newUser._id,
        public_key: publicKey,
        private_key: privateKey,
      });

      if (!keyStore) {
        return {
          code: "400",
          message: "keyStore error",
        };
      }

      // Create pair of token
      const tokens = await generatePairOfToken(
        { user_id: newUser._id, email },
        publicKey,
        privateKey
      );

      return {
        code: 201,
        metadata: {
          user: getInfoData({
            fields: [
              "_id",
              "user_name",
              "user_email",
              "user_avatar",
              "user_role",
            ],
            object: { ...newUser, user_role_name: role.name },
          }),
          tokens,
        },
      };
    }
    return {
      code: 200,
      metadata: null,
    };
  };

  signIn = async ({ email, password, refresh_token = null }) => {
    console.log("1:::email, password", email, password);
    // 1. Check email
    const foundUser = await findByEmail({ email });
    console.log("Found user", foundUser);
    if (!foundUser) throw new BadRequestError("User has not registered");

    if (foundUser.deletedBy != null) {
      throw new BadRequestError("User has been deleted");
    }

    if (!foundUser.isActive) {
      throw new BadRequestError("User is disabled");
    }

    // 2. Match password
    const isMatch = await bcrypt.compare(password, foundUser.user_password);
    if (!isMatch) throw new AuthFailureError("Authentication failed");

    // 3. Create privateKey, publicKey
    const privateKey = crypto.randomBytes(64).toString("hex");
    const publicKey = crypto.randomBytes(64).toString("hex");

    // 4. Generate token
    const { _id: userID } = foundUser;
    const tokens = await generatePairOfToken(
      { user_id: userID, email },
      publicKey,
      privateKey
    );

    await keyTokenService.createKeyToken({
      user_id: userID,
      public_key: publicKey,
      private_key: privateKey,
      refresh_token: tokens.refreshToken,
    });

    console.log("2:::tokens", tokens);

    return {
      user: getInfoData({
        fields: [
          "_id",
          "user_name",
          "user_email",
          "user_avatar",
          "user_birthday",
          "user_phone",
          "user_gender",
          "user_role",
          "user_point",
          "user_role_name",
        ],
        object: {
          ...foundUser.toObject(),
          user_role_name: foundUser.user_role.name,
        },
      }),
      tokens,
    };
  };

  logOut = async (keyStore) => {
    console.log(keyStore);
    const deletedKey = await keyTokenService.removeKeyByID(keyStore._id);
    return deletedKey;
  };

  refreshToken = async ({ refreshToken, user, keyStore }) => {
    const { user_id, email } = user;
    console.log(`User ID: ${user_id} email: ${email}`);
    if (keyStore.refreshTokenUsed.includes(refreshToken)) {
      // Delete all tokens in keyStore
      await keyTokenService.deleteKeyByUserID(user_id);
      throw new ForbiddenError(`Something went wrong, please re-login`);
    }

    if (keyStore.refreshToken !== refreshToken) {
      throw new AuthFailureError("User has not been registered");
    }

    // Check userID
    const foundUser = await findByEmail({ email });
    if (!foundUser) throw new AuthFailureError("User has not been registered");

    // Create new token
    const tokens = await generatePairOfToken(
      { user_id, email },
      keyStore.publicKey,
      keyStore.privateKey
    );

    // Update token
    await keyStore.updateOne({
      $set: {
        refreshToken: tokens.refreshToken,
      },
      $addToSet: {
        refreshTokenUsed: refreshToken,
      },
    });

    return {
      user,
      tokens,
    };
  };

  find = async ({ user_id }) => {
    const foundUser = await UserModel.findById(user_id);
    if (!foundUser) throw new NotFoundError("Can't find user");

    const user = {
      _id: foundUser._id,
      name: foundUser.user_name,
      email: foundUser.user_email,
      birthday: foundUser.user_birthday,
      avatar: foundUser.user_avatar,
      phone: foundUser.user_phone,
      gender: foundUser.user_gender,
      createdAt: foundUser.createdAt,
      point: foundUser.user_point,
    };
    return {
      user,
    };
  };

  findAll = async (keySearch) => {
    let query = {
      // deletedBy: { $exists: false },
    };

    if (keySearch) {
      query.user_name = { $regex: keySearch, $options: "i" };
    }

    const foundUsers = await UserModel.find(query).populate("user_role");
    return foundUsers;
  };

  findAllBarber = async () => {
    const barberRole = await UserRoleModel.findOne({ code: 2 }); // code 2 is for barber role
    if (!barberRole) {
      throw new NotFoundError("Barber role not found");
    }
    const query = {
      user_role: barberRole._id,
      deletedBy: { $exists: false },
    };

    const foundUsers = await UserModel.find(query);
    return foundUsers;
  };

  findReceptionist = async () => {
    const receptionistRole = await UserRoleModel.findOne({ code: 1 }); // code 1 is for receptionist role
    if (!receptionistRole) {
      throw new NotFoundError("Receptionist role not found");
    }
    const query = {
      user_role: receptionistRole._id,
      $or: [{ deletedBy: { $exists: false } }, { deletedBy: null }],
    };

    const foundUsers = await UserModel.find(query);
    return foundUsers;
  };

  findAllFreeBarber = async (keySearch, timeStart, timeEnd) => {
    let foundUsers;
    const barberRole = await UserRoleModel.findOne({ code: 2 }); // code 2 is for barber role
    if (!barberRole) {
      throw new NotFoundError("Barber role not found");
    }
    const query = {
      user_role: barberRole._id,
      deletedBy: { $exists: false },
    };

    if (keySearch) {
      query.user_name = { $regex: keySearch, $options: "i" };
    }

    // Tìm tất cả barber trước
    foundUsers = await UserModel.find(query);

    // Nếu có khung giờ thì gọi sang appointment-service
    if (timeStart && timeEnd) {
      try {
        // Gọi API busy appointment bên service kia
        const { data } = await axios.get(
          `${APPOINTMENT_SERVICE_URL}/api/v1/appointment/busy`,
          {
            params: { start: timeStart, end: timeEnd },
          }
        );

        // Lấy danh sách barber bận
        const busyAppointments = data.metadata || data; // Tùy structure trả về
        const busyBarberIds = busyAppointments
          .filter((a) => a.barber && a.barber._id)
          .map((a) => a.barber._id.toString());

        // Lọc ra barber rảnh
        foundUsers = foundUsers.filter(
          (barber) => !busyBarberIds.includes(barber._id.toString())
        );
      } catch (error) {
        console.error("❌ Error fetching busy appointments:", error.message);
      }
    }

    return foundUsers;
  };

  updateInformation = async ({
    userID,
    name,
    email,
    birthday,
    phone,
    gender,
    avatar,
  }) => {
    const foundUser = await UserModel.findById(userID);
    if (!foundUser) throw new NotFoundError("User not found");
    const filter = {
      _id: userID,
    };
    let bodyUpdate;
    if (birthday) {
      bodyUpdate = {
        user_name: name,
        user_email: email,
        user_phone: phone,
        user_gender: gender,
        user_birthday: new Date(birthday),
        user_avatar: avatar,
      };
    } else {
      bodyUpdate = {
        user_name: name,
        user_email: email,
        user_phone: phone,
        user_gender: gender,
        user_avatar: avatar,
      };
    }

    const updatedUser = await UserModel.findOneAndUpdate(filter, bodyUpdate, {
      new: true,
    });

    console.log("Updated user:::", updatedUser);
    return updatedUser;
  };

  updatePoint = async ({ userID, point }) => {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userID,
      { $inc: { user_point: point } }, // point > 0 là cộng, point < 0 là trừ
      { new: true }
    );
    return updatedUser;
  };

  changePassword = async ({ email, password, new_password }) => {
    // 1. Check email
    const foundUser = await UserModel.findOne({ user_email: email });
    if (!foundUser) throw new BadRequestError("User has not registered");

    // 2. Match password
    const isMatch = await bcrypt.compare(password, foundUser.user_password);
    if (!isMatch) throw new AuthFailureError("Authentication failed");

    // 4. Hash password
    const hashedPassword = await bcrypt.hash(new_password, 10);

    // 4. Change password
    const updatedUser = await UserModel.findOneAndUpdate(
      { user_email: email },
      { user_password: hashedPassword }
    );

    console.log("Updated user: " + updatedUser, updatedUser.modifiedCount);
    return updatedUser.modifiedCount;
  };

  restorePassword = async ({ email, new_password }) => {
    // 1. Check email
    const foundUser = await UserModel.findOne({ user_email: email });
    if (!foundUser) throw new BadRequestError("User has not registered");

    // 2. Hash password
    const hashedPassword = await bcrypt.hash(new_password, 10);

    // 3. Change password
    const updatedUser = await UserModel.findOneAndUpdate(
      { user_email: email },
      { user_password: hashedPassword }
    );

    return updatedUser.modifiedCount;
  };

  delete = async ({ deleteID, userID }) => {
    const adminRole = await UserRoleModel.findOne({ code: 0 });
    if (!adminRole) {
      throw new NotFoundError("Admin role not found");
    }
    const receptionistRole = await UserRoleModel.findOne({ code: 1 });
    if (!receptionistRole) {
      throw new NotFoundError("Receptionist role not found");
    }
    const barberRole = await UserRoleModel.findOne({ code: 2 });
    if (!barberRole) {
      throw new NotFoundError("Barber role not found");
    }

    const foundUser = await UserModel.findById(userID);
    if (
      foundUser.user_role.toString() !== adminRole._id.toString() &&
      foundUser.user_role.toString() !== receptionistRole._id.toString()
    ) {
      throw new NotFoundError("Authorization failure");
    }

    const deleteUser = await UserModel.findById(deleteID);
    if (!foundUser) throw new NotFoundError("User not found");

    const result = await UserModel.findOneAndUpdate(
      { _id: deleteUser._id },
      { deletedBy: userID, isActive: false },
      { new: true }
    );

    if (deleteUser.user_role === barberRole._id) {
      await BarberModel.findOneAndUpdate(
        { user_id: deleteUser._id },
        { fired_by: userID, isActive: false },
        { new: true }
      );
    } else if (deleteUser.user_role === receptionistRole._id) {
      await ReceptionistModel.findOneAndUpdate(
        { user_id: deleteUser._id },
        { fired_by: userID, isActive: false },
        { new: true }
      );
    }
    return result;
  };

  activate = async ({ activateID, userID }) => {
    const adminRole = await UserRoleModel.findOne({ code: 0 });
    if (!adminRole) {
      throw new NotFoundError("Admin role not found");
    }
    const receptionistRole = await UserRoleModel.findOne({ code: 1 });
    if (!receptionistRole) {
      throw new NotFoundError("Receptionist role not found");
    }
    const barberRole = await UserRoleModel.findOne({ code: 2 });
    if (!barberRole) {
      throw new NotFoundError("Barber role not found");
    }

    const foundUser = await UserModel.findById(userID);
    if (
      foundUser.user_role.toString() !== adminRole._id.toString() &&
      foundUser.user_role.toString() !== receptionistRole._id.toString()
    ) {
      throw new NotFoundError("Authorization failure");
    }

    const activateUser = await UserModel.findById(activateID);
    if (!activateUser) throw new NotFoundError("User not found");

    const result = await UserModel.findOneAndUpdate(
      { _id: activateUser._id },
      { deletedBy: null, isActive: true },
      { new: true }
    );

    if (activateUser.user_role === barberRole._id) {
      await BarberModel.findOneAndUpdate(
        { user_id: activateUser._id },
        { fired_by: null, isActive: true },
        { new: true }
      );
    } else if (activateUser.user_role === receptionistRole._id) {
      await ReceptionistModel.findOneAndUpdate(
        { user_id: activateUser._id },
        { fired_by: null, isActive: true },
        { new: true }
      );
    }

    return result;
  };

  createAccount = async ({
    user_name,
    user_email,
    user_avatar,
    user_role,
    user_gender,
  }) => {
    const password = "123456";
    // Change FE to send role ID instead of role code
    const role = await UserRoleModel.findOne({ _id: user_role });
    if (!role) {
      throw new BadRequestError("Role không tồn tại");
    }
    // Step 1: Check the existence of email
    const foundUser = await UserModel.findOne({
      user_email: user_email,
    }).lean();
    if (foundUser) throw new BadRequestError("User is already registered");

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await UserModel.create({
      user_name: user_name,
      user_email: user_email,
      user_password: hashedPassword,
      user_avatar: user_avatar,
      user_role: role._id,
      user_gender: user_gender,
    });

    if (newUser) {
      switch (role.code) {
        case 0:
          await AdminModel.create({ user_id: newUser._id });
          break;
        case 1:
          await ReceptionistModel.create({ user_id: newUser._id });
          break;
        case 2:
          await BarberModel.create({ user_id: newUser._id });
          break;
        case 3:
          await CustomerModel.create({ user_id: newUser._id });
          break;
      }

      // Create privateKey, publicKey
      const privateKey = crypto.randomBytes(64).toString("hex");
      const publicKey = crypto.randomBytes(64).toString("hex");

      const keyStore = await keyTokenService.createKeyToken({
        user_id: newUser._id,
        public_key: publicKey,
        private_key: privateKey,
      });

      if (!keyStore) {
        return {
          code: "400",
          message: "keyStore error",
        };
      }

      // Create pair of token
      const tokens = await generatePairOfToken(
        { user_id: newUser._id, user_email },
        publicKey,
        privateKey
      );

      return {
        code: 201,
        metadata: {
          user: getInfoData({
            fields: [
              "_id",
              "user_name",
              "user_email",
              "user_avatar",
              "user_role",
            ],
            object: { ...newUser, user_role_name: role.name },
          }),
          tokens,
        },
      };
    }
    return {
      code: 200,
      metadata: null,
    };
  };
  async getHighlightImages(userID) {
    const user = await UserModel.findById(userID).select(
      "user_highlight_images"
    );
    if (!user) throw new Error("User not found");
    return user.user_highlight_images;
  }

  // Thêm ảnh highlight
  async addHighlightImage(userID, imageUrl) {
    const user = await UserModel.findById(userID);
    if (!user) throw new Error("User not found");

    // tránh trùng lặp
    if (!user.user_highlight_images.includes(imageUrl)) {
      user.user_highlight_images.push(imageUrl);
    }

    await user.save();
    return user.user_highlight_images;
  }

  // Xóa ảnh highlight
  async removeHighlightImage(userID, imageUrl) {
    const user = await UserModel.findById(userID);
    if (!user) throw new Error("User not found");

    user.user_highlight_images = user.user_highlight_images.filter(
      (img) => img !== imageUrl
    );

    await user.save();
    return user.user_highlight_images;
  }
}

module.exports = new UserService();
