const salaryService = require("../services/salary");
const { SuccessResponse } = require("../core/success-response");

class SalaryController {
  async getAll(req, res, next) {
    const { month, year } = req.query;

    if (!month || !year) {
      return res.status(400).json({ message: "Missing month or year" });
    }

    const metadata = await salaryService.calculateSalaryForAllStaff(
      parseInt(month),
      parseInt(year)
    );

    new SuccessResponse({
      message: `Lương tháng ${month}/${year}`,
      metadata,
    }).send(res);
  }
}

module.exports = new SalaryController();
