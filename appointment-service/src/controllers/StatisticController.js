const statisticService = require("../services/statistic");
const {
  SuccessResponse,
} = require("../core/success-response");
const {
  BadRequestError,
} = require("../core/error-response");

class StatisticController {
  async getAverageRatingOfBarber(req, res, next) {
    const { barberID } = req.params;
    if (!barberID) throw new BadRequestError("Missing barber ID.");

    const metadata = await statisticService.getAverageRatingOfBarber(barberID);
    new SuccessResponse({
      message: "Average rating of barber",
      metadata,
    }).send(res);
  }

  async getAverageRatingOfBarbers(req, res, next) {
    const metadata = await statisticService.getAverageRatingOfBarbers();
    new SuccessResponse({
      message: "Average rating of barbers",
      metadata,
    }).send(res);
  }

  async getIncomeOfBarberInCurrentMonth(req, res, next) {
    const { barberID } = req.params;
    if (!barberID) throw new BadRequestError("Missing barber ID.");

    const metadata = await statisticService.getIncomeOfBarberInCurrentMonth(
      barberID
    );
    new SuccessResponse({
      message: "Income of barber in current month",
      metadata,
    }).send(res);
  }

  async getIncomeOfBarbersInCurrentMonth(req, res, next) {
    const metadata = await statisticService.getIncomeOfBarbersInCurrentMonth();
    new SuccessResponse({
      message: "Income of barbers in current month",
      metadata,
    }).send(res);
  }

  async getIncomeOfBarber(req, res, next) {
    const { barberID } = req.params;
    const { start, end } = req.query;
    if (!barberID || !start || !end)
      throw new BadRequestError("Missing parameters.");

    const metadata = await statisticService.getIncomeOfBarber(barberID, {
      start,
      end,
    });

    new SuccessResponse({
      message: "Income of barber in given time range",
      metadata,
    }).send(res);
  }

  async getIncomeOfBarberByMonthInYear(req, res, next) {
    const { barberID } = req.params;
    const { year } = req.query;

    if (!barberID || !year) {
      throw new BadRequestError("Missing barberID or year.");
    }

    const metadata = await statisticService.getIncomeOfBarberByMonthInYear(
      barberID,
      parseInt(year)
    );

    new SuccessResponse({
      message: `Income of barber by month in ${year}`,
      metadata,
    }).send(res);
  }

  async getIncomeOfSystemInCurrentMonth(req, res, next) {
    const metadata = await statisticService.getIncomeOfSystemInCurrentMonth();
    new SuccessResponse({
      message: "System income in current month",
      metadata,
    }).send(res);
  }

  async getIncomeOfSystem(req, res, next) {
    const { start, end } = req.query;
    if (!start || !end) throw new BadRequestError("Missing date range.");

    const metadata = await statisticService.getIncomeOfSystem({ start, end });
    new SuccessResponse({
      message: "System income in given time range",
      metadata,
    }).send(res);
  }

  async getIncomeSystemByMonthInYear(req, res, next) {
    const { year } = req.query;
    if (!year) throw new BadRequestError("Missing year.");

    const metadata = await statisticService.getIncomeSystemByMonthInYear(
      parseInt(year)
    );

    new SuccessResponse({
      message: `System income by month in ${year}`,
      metadata,
    }).send(res);
  }

  async getAppointmentOfSystem(req, res, next) {
    const { start, end } = req.query;
    if (!start || !end) throw new BadRequestError("Missing date range.");

    const metadata = await statisticService.getAppointmentOfSystem({
      start,
      end,
    });
    new SuccessResponse({
      message: "System appointment in given time range",
      metadata,
    }).send(res);
  }

  async getAppointmentSystemByMonthInYear(req, res, next) {
    const { year } = req.query;
    if (!year) throw new BadRequestError("Missing year.");

    const metadata = await statisticService.getAppointmentSystemByMonthInYear(
      parseInt(year)
    );

    new SuccessResponse({
      message: `System appointment by month in ${year}`,
      metadata,
    }).send(res);
  }
}

module.exports = new StatisticController();
