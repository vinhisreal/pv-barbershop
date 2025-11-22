const { UserRoleModel } = require("../models/UserRole");
const { NotFoundError } = require("../core/error-response");

class UserRoleService {
  async createRole(name, description, code) {
    const exists = await UserRoleModel.findOne({ code });
    if (exists) {
      throw new Error("Role đã tồn tại");
    }

    const role = await UserRoleModel.create({ name, description, code });
    return role;
  }

  async getAllRoles() {
    return await UserRoleModel.find();
  }

  async getRoleById(id) {
    const role = await UserRoleModel.findById(id);
    if (!role) throw new NotFoundError("Không tìm thấy role");
    return role;
  }

  async updateRole(id, { name, description, code }) {
    const role = await UserRoleModel.findById(id);
    if (!role) throw new NotFoundError("Role không tồn tại");

    // Nếu cập nhật code, phải check trùng
    if (code && code !== role.code) {
      const exists = await UserRoleModel.findOne({ code });
      if (exists) {
        throw new Error("Code role đã tồn tại");
      }
    }

    // Update từng field nếu có gửi lên
    if (name) role.name = name;
    if (description) role.description = description;
    if (code) role.code = code;

    await role.save();

    return role;
  }

  async deleteRole(id) {
    const role = await UserRoleModel.findById(id);
    if (!role) throw new NotFoundError("Role không tồn tại");

    await UserRoleModel.findByIdAndDelete(id);
    return { deleted: true };
  }
}

module.exports = new UserRoleService();
