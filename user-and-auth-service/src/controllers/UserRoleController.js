const userRoleService = require("../services/user-role");
const { SuccessResponse } = require("../core/success-response");

class UserRoleController {
  async create(req, res, next) {
    const { name, description, code } = req.body;

    const metadata = await userRoleService.createRole(name, description, code);

    new SuccessResponse({
      message: "Tạo role thành công",
      metadata,
    }).send(res);
  }

  async getAll(req, res, next) {
    const metadata = await userRoleService.getAllRoles();

    new SuccessResponse({
      message: "Danh sách role",
      metadata,
    }).send(res);
  }

  async getById(req, res, next) {
    const { id } = req.params;
    const metadata = await userRoleService.getRoleById(id);

    new SuccessResponse({
      message: "Chi tiết role",
      metadata,
    }).send(res);
  }

  async update(req, res, next) {
    const { id } = req.params;
    const { name, description, code } = req.body;

    const metadata = await userRoleService.updateRole(id, {
      name,
      description,
      code,
    });

    new SuccessResponse({
      message: "Cập nhật role thành công",
      metadata,
    }).send(res);
  }

  async delete(req, res, next) {
    const { id } = req.params;

    const metadata = await userRoleService.deleteRole(id);

    new SuccessResponse({
      message: "Xóa role thành công",
      metadata,
    }).send(res);
  }
}

module.exports = new UserRoleController();
