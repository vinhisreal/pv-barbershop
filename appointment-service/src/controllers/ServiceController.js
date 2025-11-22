const serviceService = require("../services/service");
const { CREATED, SuccessResponse } = require("../core/success-response");

class ServiceController {
  async create(req, res, next) {
    new CREATED({
      message: "Service created successfully",
      metadata: await serviceService.createService(req.body),
    }).send(res);
  }

  async getAll(req, res, next) {
    new SuccessResponse({
      message: "List of services",
      metadata: await serviceService.getAllServices(),
    }).send(res);
  }

  async getById(req, res, next) {
    new SuccessResponse({
      message: "Service details",
      metadata: await serviceService.getServiceById(req.params.id),
    }).send(res);
  }

  async update(req, res, next) {
    new SuccessResponse({
      message: "Service updated successfully",
      metadata: await serviceService.updateService(req.params.id, req.body),
    }).send(res);
  }

  async delete(req, res, next) {
    new SuccessResponse({
      message: "Service deleted successfully",
      metadata: await serviceService.deleteService(req.params.id),
    }).send(res);
  }
}

module.exports = new ServiceController();
