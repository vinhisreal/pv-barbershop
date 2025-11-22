const ReviewModel = require("../models/Review");
const AppointmentModel = require("../models/Appointment");
const {
  normalizeId,
  fetchInvoicesByAppointmentIds,
  fetchUsersByIds,
} = require("../helpers/function/statistic");
const { hydrateBarberCustomer } = require("../helpers/function/appointment");

const mongoose = require("mongoose");

class StatisticService {
  async getAverageRatingOfBarber(barberID) {
    const result = await ReviewModel.aggregate([
      { $match: { barber: new mongoose.Types.ObjectId(barberID) } },
      {
        $group: {
          _id: "$barber",
          averageRating: { $avg: "$rating" },
          totalReview: { $sum: 1 },
        },
      },
    ]);

    if (!result.length) return { averageRating: 0, totalReview: 0 };
    return result[0];
  }

  async getAverageRatingOfBarbers() {
    const result = await ReviewModel.aggregate([
      {
        $group: {
          _id: "$barber",
          averageRating: { $avg: "$rating" },
          totalReview: { $sum: 1 },
        },
      },
    ]);

    // Hydrate barber info từ user-service
    const barberIds = result.map((r) => normalizeId(r._id)).filter(Boolean);
    const userMap = await fetchUsersByIds(barberIds);

    // Gắn thông tin barber, lọc role 'staff' như logic cũ (nếu cần)
    const hydrated = result
      .map((r) => {
        const id = normalizeId(r._id);
        const user = userMap.get(id);
        return {
          barberID: id,
          averageRating: r.averageRating,
          totalReview: r.totalReview,
          barberName: user?.name || null,
          barberAvatar: user?.avatar || null,
          barberRole: user?.role || null,
        };
      })
      .sort((a, b) => b.averageRating - a.averageRating);

    return hydrated;
  }

  async getIncomeOfBarberInCurrentMonth(barberID) {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    return this.getIncomeOfBarber(barberID, { start, end });
  }

  async getIncomeOfBarbersInCurrentMonth() {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    const apps = await AppointmentModel.find({
      appointment_start: { $gte: start, $lt: end },
    })
      .select("_id barber")
      .lean();

    console.log(
      `[stat] appointments=${
        apps.length
      } range=[${start.toISOString()}..${end.toISOString()}]`
    );

    if (!apps.length) return [];

    const apptIds = apps.map((a) => normalizeId(a._id));
    const apptToBarber = new Map(
      apps.map((a) => [normalizeId(a._id), normalizeId(a.barber)])
    );

    console.log(
      `[stat] apptToBarber size=${apptToBarber.size} sample=${JSON.stringify(
        Array.from(apptToBarber.entries()).slice(0, 3)
      )}`
    );

    const invoices = await fetchInvoicesByAppointmentIds(apptIds);
    console.log(`[stat] invoices fetched=${invoices.length}`);

    const incomeByBarber = new Map();

    for (const inv of invoices) {
      const apptId = normalizeId(inv?.appointment?._id || inv?.appointment);
      if (!apptId) {
        console.log(`[stat] skip invoice without appointment id: ${inv?._id}`);
        continue;
      }

      const barberId = apptToBarber.get(apptId);
      if (!barberId) {
        console.log(`[stat] no barber mapping for apptId=${apptId}`);
        continue;
      }

      const current = incomeByBarber.get(barberId) || 0;
      incomeByBarber.set(barberId, current + (Number(inv?.total_amount) || 0));
    }

    console.log(
      `[stat] incomeByBarber entries=${
        incomeByBarber.size
      } sample=${JSON.stringify(
        Array.from(incomeByBarber.entries()).slice(0, 3)
      )}`
    );

    const barberIds = Array.from(incomeByBarber.keys());

    const barberStubs = barberIds.map((id) => ({ barber: id }));

    const hydratedBarbers = await hydrateBarberCustomer(barberStubs);

    const idToBarber = new Map(
      hydratedBarbers.map((item) => {
        const b = item?.barber;
        return [normalizeId(b?._id || b?.id || b), b];
      })
    );

    const result = barberIds
      .map((id) => {
        const b = idToBarber.get(id);
        return {
          barberID: id,
          totalIncome: incomeByBarber.get(id) || 0,
          barberName: b?.name || null,
          barberAvatar: b?.avatar || null,
          barberRole: b?.role || null,
        };
      })
      .sort((a, b) => b.totalIncome - a.totalIncome);

    console.log(`[stat] result count=${result.length}`);
    return result;
  }

  async getIncomeOfBarber(barberID, time = {}) {
    const { start, end } = time;

    const match = { barber: barberID };
    if (start && end) {
      match.appointment_start = { $gte: new Date(start), $lt: new Date(end) };
    }

    const apps = await AppointmentModel.find(match).select("_id").lean();
    if (!apps.length) return 0;

    const apptIds = apps.map((a) => normalizeId(a._id));
    const invoices = await fetchInvoicesByAppointmentIds(apptIds);

    const total = invoices.reduce(
      (sum, inv) => sum + (Number(inv?.total_amount) || 0),
      0
    );
    return total;
  }

  async getIncomeOfSystemInCurrentMonth() {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    return this.getIncomeOfSystem({ start, end });
  }

  async getIncomeOfBarberByMonthInYear(barberID, year) {
    const results = [];
    for (let m = 0; m < 12; m++) {
      const start = new Date(year, m, 1);
      const end = new Date(year, m + 1, 1);

      const apps = await AppointmentModel.find({
        barber: barberID,
        appointment_start: { $gte: start, $lt: end },
      })
        .select("_id")
        .lean();

      if (!apps.length) {
        results.push({ month: m + 1, totalIncome: 0 });
        continue;
      }

      const apptIds = apps.map((a) => normalizeId(a._id));
      const invoices = await fetchInvoicesByAppointmentIds(apptIds);
      const total = invoices.reduce(
        (sum, inv) => sum + (Number(inv?.total_amount) || 0),
        0
      );

      results.push({ month: m + 1, totalIncome: total });
    }
    return results;
  }

  async getIncomeOfSystem(time = {}) {
    const { start, end } = time;
    const match = {};
    if (start && end) {
      match.appointment_start = { $gte: new Date(start), $lt: new Date(end) };
    }

    const apps = await AppointmentModel.find(match).select("_id").lean();
    if (!apps.length) return 0;

    const apptIds = apps.map((a) => normalizeId(a._id));
    const invoices = await fetchInvoicesByAppointmentIds(apptIds);

    const total = invoices.reduce(
      (sum, inv) => sum + (Number(inv?.total_amount) || 0),
      0
    );
    return total;
  }

  async getIncomeSystemByMonthInYear(year) {
    const start = new Date(`${year}-01-01`);
    const end = new Date(`${year + 1}-01-01`);

    const result = await InvoiceModel.aggregate([
      {
        $match: {
          createdAt: { $gte: start, $lt: end },
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          totalIncome: { $sum: "$total_amount" },
        },
      },
      {
        $project: {
          month: "$_id",
          totalIncome: 1,
          _id: 0,
        },
      },
      {
        $sort: { month: 1 },
      },
    ]);

    const fullYearIncome = Array.from({ length: 12 }, (_, i) => {
      const month = i + 1;
      const found = result.find((r) => r.month === month);
      return {
        month,
        totalIncome: found ? found.totalIncome : 0,
      };
    });

    return fullYearIncome;
  }

  async getAppointmentOfSystem({ start, end }) {
    const matchQuery = {
      status: "completed",
    };

    if (start && end) {
      matchQuery.appointment_start = {
        $gte: new Date(start),
        $lt: new Date(end),
      };
    }

    const total = await AppointmentModel.countDocuments(matchQuery);
    return total;
  }

  async getIncomeSystemByMonthInYear(year) {
    const results = [];
    for (let m = 0; m < 12; m++) {
      const start = new Date(year, m, 1);
      const end = new Date(year, m + 1, 1);

      const apps = await AppointmentModel.find({
        appointment_start: { $gte: start, $lt: end },
      })
        .select("_id")
        .lean();

      if (!apps.length) {
        results.push({ month: m + 1, totalIncome: 0 });
        continue;
      }

      const apptIds = apps.map((a) => normalizeId(a._id));
      const invoices = await fetchInvoicesByAppointmentIds(apptIds);
      const total = invoices.reduce(
        (sum, inv) => sum + (Number(inv?.total_amount) || 0),
        0
      );

      results.push({ month: m + 1, totalIncome: total });
    }
    return results;
  }

  async getAppointmentSystemByMonthInYear(year) {
    const start = new Date(`${year}-01-01`);
    const end = new Date(`${year + 1}-01-01`);

    const result = await AppointmentModel.aggregate([
      {
        $match: {
          appointment_start: { $gte: start, $lt: end },
          status: "completed",
        },
      },
      {
        $group: {
          _id: { $month: "$appointment_start" },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          month: "$_id",
          count: 1,
          _id: 0,
        },
      },
      { $sort: { month: 1 } },
    ]);

    const fullYear = Array.from({ length: 12 }, (_, i) => {
      const month = i + 1;
      const found = result.find((r) => r.month === month);
      return {
        month,
        count: found ? found.count : 0,
      };
    });

    return fullYear;
  }
}

module.exports = new StatisticService();
