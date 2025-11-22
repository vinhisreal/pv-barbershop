const express = require("express");
const router = express.Router();
const asyncHandler = require("../helpers/async-handler");
const statisticController = require("../controllers/StatisticController");

router.get(
  "/barber/:barberID/rating",
  asyncHandler(statisticController.getAverageRatingOfBarber)
);

router.get(
  "/barbers/rating",
  asyncHandler(statisticController.getAverageRatingOfBarbers)
);

router.get(
  "/barber/:barberID/income/month",
  asyncHandler(statisticController.getIncomeOfBarberInCurrentMonth)
);

router.get(
  "/barbers/income/month",
  asyncHandler(statisticController.getIncomeOfBarbersInCurrentMonth)
);

router.get(
  "/barber/:barberID/income",
  asyncHandler(statisticController.getIncomeOfBarber)
);

router.get(
  "/barber/:barberID/income/year",
  asyncHandler(statisticController.getIncomeOfBarberByMonthInYear)
);

router.get(
  "/system/income/month",
  asyncHandler(statisticController.getIncomeOfSystemInCurrentMonth)
);

router.get(
  "/system/income",
  asyncHandler(statisticController.getIncomeOfSystem)
);

router.get(
  "/system/income/year",
  asyncHandler(statisticController.getIncomeSystemByMonthInYear)
);

router.get(
  "/system/appointment",
  asyncHandler(statisticController.getAppointmentOfSystem)
);

router.get(
  "/system/appointment/year",
  asyncHandler(statisticController.getAppointmentSystemByMonthInYear)
);

module.exports = router;
