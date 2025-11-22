const { UserModel } = require("../models/User");
const { NotFoundError } = require("../core/error-response");
const { UserRoleModel } = require("../models/UserRole");
const axios = require("axios");
const BILLING_SERVICE_BASE_URL =
  process.env.BILLING_SERVICE_BASE_URL || "http://localhost:5003";
const APPOINTMENT_SERVICE_BASE_URL =
  process.env.APPOINTMENT_SERVICE_BASE_URL || "http://localhost:5002";

class SalaryService {
  async calculateSalaryForAllStaff(month, year) {
    try {
      const staffRole = await UserRoleModel.findOne({ code: 2 }); // Mã vai trò cho "staff"
      const receptionistRole = await UserRoleModel.findOne({ code: 1 }); // Mã vai trò cho "receptionist"

      if (!staffRole || !receptionistRole) {
        throw new NotFoundError("Không tìm thấy role staff hoặc receptionist");
      }

      const employees = await UserModel.find({
        user_role: { $in: [staffRole._id, receptionistRole._id] },
      })
        .populate("user_role")
        .lean();

      if (!employees || employees.length === 0) {
        throw new NotFoundError("Không tìm thấy nhân viên nào.");
      }

      const result = [];

      // Thiết lập khoảng thời gian trong tháng
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0, 23, 59, 59);

      for (const employee of employees) {
        const { _id, user_name, user_avatar, user_role } = employee;
        const roleCode = user_role.code;

        if (roleCode === 1) {
          // Receptionist (fixed salary)
          result.push({
            user_id: _id,
            user_name,
            role: user_role.name,
            salary: 40000000,
            user_avatar,
          });
          continue;
        }

        // ----- STAFF / BARBER -----
        // Lấy appointment theo nhân viên
        const response = await axios.get(
          `${APPOINTMENT_SERVICE_BASE_URL}/appointment/barber/${_id}/filter`,
          {
            params: {
              status: "completed",
              start: startDate.toISOString(),
              end: endDate.toISOString(),
            },
          }
        );

        const appointments = response.data.metadata || [];
        const appointmentIds = appointments.map((app) => app._id);

        let invoices = [];
        if (appointmentIds.length > 0) {
          const idsParam = appointmentIds.join(",");
          const billingResp = await axios.get(
            `${BILLING_SERVICE_BASE_URL}/invoice/by-appointments`,
            { params: { ids: idsParam } }
          );
          invoices = billingResp.data.metadata || [];
        }

        const totalServiceAmount = invoices.reduce(
          (sum, invoice) => sum + invoice.total_amount,
          0
        );

        const commission = totalServiceAmount * 0.1;
        const salary = 7000000 + commission;

        result.push({
          user_id: _id,
          user_avatar,
          user_name,
          role: user_role.name,
          salary: Math.round(salary),
        });
      }

      return result;
    } catch (err) {
      console.error("Lỗi tính lương:", err);
      throw err;
    }
  }
}

module.exports = new SalaryService();
