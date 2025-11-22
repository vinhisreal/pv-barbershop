const appointmentService = require("../services/appointment");
const { CREATED, SuccessResponse } = require("../core/success-response");

class AppointmentController {
  async create(req, res, next) {
    new CREATED({
      message: "Appointment created successfully",
      metadata: await appointmentService.createAppointment(req.body),
    }).send(res);
  }

  async get(req, res, next) {
    const appointmentID = req.params.id;
    const populate = req.query.populate
    new SuccessResponse({
      message: "Get appointment",
      metadata: await appointmentService.getAppointment(appointmentID, populate),
    }).send(res);
  }

  async getAll(req, res, next) {
    new SuccessResponse({
      message: "All appointments",
      metadata: await appointmentService.getAllAppointments(),
    }).send(res);
  }

  async getByUser(req, res, next) {
    new SuccessResponse({
      message: "User's appointments",
      metadata: await appointmentService.getAppointmentsByUser(
        req.params.userID
      ),
    }).send(res);
  }

  async getByBarber(req, res, next) {
    new SuccessResponse({
      message: "Barber's appointments",
      metadata: await appointmentService.getAppointmentsForBarber(
        req.params.barberId
      ),
    }).send(res);
  }

  async getBusyAppointments(req, res, next) {
    const { start, end } = req.query;

    new SuccessResponse({
      message: "Busy appointments fetched successfully",
      metadata: await appointmentService.getBusyAppointments(start, end),
    }).send(res);
  }

  async getByBarberAndStatus(req, res, next) {
    const { barberId } = req.params;
    const { status, start, end } = req.query;

    new SuccessResponse({
      message: `Appointments for barber ${barberId} with status ${status || "all"}`,
      metadata: await appointmentService.getAppointmentsByBarberAndStatus(
        barberId,
        status,
        start,
        end
      ),
    }).send(res);
  }



  async update(req, res, next) {
    new SuccessResponse({
      message: "Appointment updated",
      metadata: await appointmentService.updateAppointment(req.body),
    }).send(res);
  }
  async updateStatus(req, res, next) {
    new SuccessResponse({
      message: "Appointment status updated",
      metadata: await appointmentService.updateAppointmentStatus(
        req.params.id,
        req.body.status
      ),
    }).send(res);
  }

  async updateProof(req, res, next) {
    new SuccessResponse({
      message: "Appointment proof updated",
      metadata: await appointmentService.updateAppointmentProof(
        req.params.id,
        req.body.complete_picture
      ),
    }).send(res);
  }

  async delete(req, res, next) {
    new SuccessResponse({
      message: "Appointment deleted successfully",
      metadata: await appointmentService.deleteAppointment(req.params.id),
    }).send(res);
  }
}

module.exports = new AppointmentController();
