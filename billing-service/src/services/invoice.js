const fs = require("fs");
const path = require("path");
const axios = require("axios");
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
const InvoiceModel = require("../models/Invoice");
const { NotFoundError, BadRequestError } = require("../core/error-response");
const {
  hydrateInvoicesWithAppointment,
  normalizeId,
} = require("../helpers/function/invoice");
const { docxToPdf } = require("../utils/index");

class InvoiceService {
  async createInvoice({ appointment_id, total_amount, payment_method }) {
    const newInvoice = await InvoiceModel.create({
      appointment: appointment_id,
      total_amount,
      payment_method,
    });

    return newInvoice;
  }

  async getInvoicesByUser(userID) {
    const invoices = await InvoiceModel.find().sort({ createdAt: -1 }).lean();
    const hydrated = await hydrateInvoicesWithAppointment(invoices);
    const uid = normalizeId(userID);
    return hydrated.filter(
      (inv) => inv.appointment && normalizeId(inv.appointment.customer) === uid
    );
  }

  async getAllInvoices(populate) {
    if (populate) {
      const invoices = await InvoiceModel.find().sort({ createdAt: -1 }).lean();
      return await hydrateInvoicesWithAppointment(invoices);
    }
    return await InvoiceModel.find().sort({ createdAt: -1 });
  }

  async updateInvoiceStatus(invoiceID, status) {
    const updatedInvoice = await InvoiceModel.findByIdAndUpdate(
      invoiceID,
      { status },
      { new: true }
    );

    if (!updatedInvoice) throw new NotFoundError("Invoice not found");
    return updatedInvoice;
  }

  async getByAppointment(appointmentId) {
    const inv = await InvoiceModel.findOne({
      appointment: appointmentId,
    }).lean();
    if (!inv) return null;
    return await hydrateInvoicesWithAppointment(inv);
  }

  async getInvoicesByAppointments(appointmentIds) {
    if (!Array.isArray(appointmentIds) || appointmentIds.length === 0)
      return [];

    const ids = appointmentIds.map(normalizeId).filter(Boolean);

    const invoices = await InvoiceModel.find({ appointment: { $in: ids } })
      .sort({ createdAt: -1 })
      .lean();

    return await hydrateInvoicesWithAppointment(invoices);
  }

  async exportInvoice(invoiceId) {
    // 1️⃣ Lấy dữ liệu hóa đơn đầy đủ
    const invoice = await InvoiceModel.findById(invoiceId).lean();
    if (!invoice) throw new Error("Không tìm thấy hóa đơn");
    const hydrated = await hydrateInvoicesWithAppointment(invoice);

    // 2️⃣ Gọi API lấy danh sách service ngoài
    const response = await axios.get(
      `${process.env.APPOINTMENT_SERVICE_BASE_URL}/service/all`
    );
    const allServices = response.data?.metadata || []; // giả sử API trả { data: [...] }

    // 3️⃣ Đánh dấu dịch vụ đã dùng
    const usedIds = hydrated.appointment.service.map((s) => String(s._id));
    const servicesWithCheck = allServices.map((s) => ({
      ...s,
      checked: usedIds.includes(String(s._id)) ? "☑" : "☐",
    }));

    // 4️⃣ Đọc file template
    const templatePath = path.join(
      __dirname,
      "../templates/invoice-template.docx"
    );
    const content = fs.readFileSync(templatePath);
    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    // 5️⃣ Điền dữ liệu vào template
    doc.render({
      invoice_code: invoice._id,
      date: new Date(invoice.createdAt).toLocaleDateString("vi-VN"),
      customer_name: hydrated.appointment.customer_name,
      barber_name: hydrated.appointment.barber.name,
      total_amount: invoice.total_amount.toLocaleString("vi-VN") + "đ",
      payment_method: invoice.payment_method === "cash" ? "Tiền mặt" : "Momo",
      services: servicesWithCheck,
    });

    // 6️⃣ Tạo file .docx tạm
    const tempDir = path.join(__dirname, "../temp");

    // 👉 Nếu chưa có folder temp thì tự tạo
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    const outputDocx = path.resolve(tempDir, `invoice-${invoiceId}.docx`);
    fs.writeFileSync(outputDocx, doc.getZip().generate({ type: "nodebuffer" }));

    // 7️⃣ Convert sang PDF
    const pdfBuffer = await docxToPdf(outputDocx);

    // 8️⃣ Xóa file tạm
    fs.unlinkSync(outputDocx);

    return pdfBuffer;
  }

  async deleteInvoice(invoiceId) {
    const deleted = await InvoiceModel.findByIdAndDelete(invoiceId);

    if (!deleted) {
      throw new NotFoundError("Invoice not found");
    }

    return deleted;
  }
}

module.exports = new InvoiceService();
