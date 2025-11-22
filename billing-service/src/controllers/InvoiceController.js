const invoiceService = require("../services/invoice");
const { CREATED, SuccessResponse } = require("../core/success-response");

class InvoiceController {
  async create(req, res, next) {
    new CREATED({
      message: "Invoice created successfully",
      metadata: await invoiceService.createInvoice(req.body),
    }).send(res);
  }

  async getByUser(req, res, next) {
    new SuccessResponse({
      message: "User's invoices",
      metadata: await invoiceService.getInvoicesByUser(req.params.userId),
    }).send(res);
  }

  async getAll(req, res, next) {
    new SuccessResponse({
      message: "All's invoices",
      metadata: await invoiceService.getAllInvoices(req.query.populate),
    }).send(res);
  }

  async updateStatus(req, res, next) {
    new SuccessResponse({
      message: "Invoice status updated",
      metadata: await invoiceService.updateInvoiceStatus(
        req.params.id,
        req.body.status
      ),
    }).send(res);
  }
  async getByAppointment(req, res) {
    const { appointmentId } = req.params;

    const invoice = await invoiceService.getByAppointment(appointmentId);
    if (!invoice) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy hóa đơn cho appointment này" });
    }

    res.status(200).json({
      message: "Lấy hóa đơn thành công",
      data: invoice,
    });
  }

  async getByAppointments(req, res, next) {
    const ids = req.query.ids?.split(",") || [];
    new SuccessResponse({
      message: "Invoices by appointments",
      metadata: await invoiceService.getInvoicesByAppointments(ids),
    }).send(res);
  }

  async exportInvoice(req, res, next) {
    try {
      const invoiceId = req.params.id;
      const fileBuffer = await invoiceService.exportInvoice(invoiceId);

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=invoice-${invoiceId}.pdf`
      );
      res.send(fileBuffer);
    } catch (error) {
      next(error);
    }
  }

  async deleteInvoice(req, res, next) {
    new SuccessResponse({
      message: "Invoice deleted successfully",
      metadata: await invoiceService.deleteInvoice(req.params.id),
    }).send(res);
  }
}

module.exports = new InvoiceController();
