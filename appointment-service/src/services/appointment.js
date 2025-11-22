const AppointmentModel = require("../models/Appointment");
const { NotFoundError } = require("../core/error-response");
require("../models/Service");
const axios = require("axios");
const { hydrateBarberCustomer } = require("../helpers/function/appointment");

class AppointmentService {
  async createAppointment({
    customer,
    barber,
    service,
    start,
    end,
    customer_name,
    phone_number,
    notes,
  }) {
    if (!Array.isArray(service) || service.length === 0) {
      throw new BadRequestError("At least one service must be selected.");
    }

    const newAppointment = await AppointmentModel.create({
      customer,
      barber,
      service,
      appointment_start: start,
      appointment_end: end,
      customer_name,
      phone_number,
      notes,
    });

    return newAppointment;
  }

  async getAppointment(appointmentID, populate) {
    const baseQuery = AppointmentModel.findOne({ _id: appointmentID });
    const doc = populate
      ? await baseQuery.populate("service").lean()
      : await baseQuery.populate("service").lean();
    if (!doc) return null;
    return await hydrateBarberCustomer(doc);
  }

  async getAllAppointments() {
    const docs = await AppointmentModel.find()
      .populate("service")
      .sort({ appointment_start: -1 })
      .lean();
    return await hydrateBarberCustomer(docs);
  }

  async getAppointmentsByUser(userID) {
    const docs = await AppointmentModel.find({ customer: userID })
      .populate("service")
      .lean();

    return await hydrateBarberCustomer(docs);
  }

  async getAppointmentsForBarber(barberID) {
    const docs = await AppointmentModel.find({
      barber: barberID,
      status: { $ne: "pending" },
    })
      .populate("service")
      .lean();

    return await hydrateBarberCustomer(docs);
  }

  // updateAppointment: populate service + hydrate barber/customer cho record cập nhật
  async updateAppointment({
    _id,
    customer,
    barber,
    service,
    appointment_start,
    appointment_end,
    customer_name,
    phone_number,
    notes,
    status,
  }) {
    const updated = await AppointmentModel.findByIdAndUpdate(
      _id,
      {
        customer,
        barber,
        service,
        appointment_start,
        appointment_end,
        customer_name,
        phone_number,
        notes,
        status,
      },
      { new: true }
    )
      .populate("service")
      .lean();

    if (!updated) throw new NotFoundError("Appointment not found");

    return await hydrateBarberCustomer(updated);
  }

  async updateAppointmentStatus(appointmentID, status) {
    const updatedAppointment = await AppointmentModel.findByIdAndUpdate(
      appointmentID,
      { status },
      { new: true }
    );

    if (!updatedAppointment) throw new NotFoundError("Appointment not found");
    return updatedAppointment;
  }

  async getBusyAppointments(timeStart, timeEnd) {
    if (!timeStart || !timeEnd) {
      throw new BadRequestError("Missing start or end time");
    }

    const docs = await AppointmentModel.find({
      appointment_start: { $lt: new Date(timeEnd) },
      appointment_end: { $gt: new Date(timeStart) },
    }).lean();

    return await hydrateBarberCustomer(docs);
  }

  async getAppointmentsByBarberAndStatus(barberId, status, startDate, endDate) {
    const query = { barber: barberId };

    if (status) {
      query.status = status;
    }

    if (startDate && endDate) {
      query.appointment_end = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const docs = await AppointmentModel.find(query)
      .populate("service")
      .sort({ appointment_end: -1 })
      .lean();

    return await hydrateBarberCustomer(docs);
  }

  async updateAppointmentProof(appointmentID, complete_picture) {
    const updatedAppointment = await AppointmentModel.findByIdAndUpdate(
      appointmentID,
      { complete_picture },
      { new: true }
    );

    if (!updatedAppointment) throw new NotFoundError("Appointment not found");
    return updatedAppointment;
  }

  async deleteAppointment(appointmentID) {
    const deletedAppointment = await AppointmentModel.findByIdAndDelete(
      appointmentID
    );
    if (!deletedAppointment) throw new NotFoundError("Appointment not found");
    return deletedAppointment;
  }
}

module.exports = new AppointmentService();
