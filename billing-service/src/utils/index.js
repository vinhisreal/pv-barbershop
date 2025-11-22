const _ = require("lodash");
const libre = require("libreoffice-convert");
const fs = require("fs");
const path = require("path");
const { execFile } = require("child_process");

const { Types } = require("mongoose");
const getInfoData = ({ fields = [], object = {} }) => {
  return _.pick(object, fields);
};

const getSelectData = (select = []) => {
  return Object.fromEntries(select.map((element) => [element, 1]));
};

const unGetSelectData = (select = []) => {
  return Object.fromEntries(select.map((element) => [element, 0]));
};

const removeUndefinedObject = (obj) => {
  Object.keys(obj).forEach((key) => {
    if (obj[key] == null) {
      delete obj[key];
    }
  });
  return obj;
};

const updateNestedObjectParser = (obj) => {
  const final = {};
  Object.keys(obj || {}).forEach((key) => {
    if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
      const response = updateNestedObjectParser(obj[key]);
      Object.keys(response).forEach((a) => {
        final[`${key}.${a}`] = response[a];
      });
    } else {
      final[key] = obj[key];
    }
  });
  return final;
};

const convertToObjectIDMongo = (id) => new Types.ObjectId(id);

async function docxToPdf(inputPath) {
  return new Promise((resolve, reject) => {
    const outputPath = inputPath.replace(/\.docx$/i, ".pdf");
    const sofficePath = process.env.LIBREOFFICE_PATH || "soffice";
    console.log("Soffice", sofficePath);
    const args = [
      "--headless",
      "--convert-to",
      "pdf",
      "--outdir",
      path.dirname(inputPath),
      inputPath,
    ];

    execFile(sofficePath, args, (err, stdout, stderr) => {
      if (err) return reject(err);
      if (!fs.existsSync(outputPath)) {
        return reject(new Error("PDF không được tạo ra"));
      }
      const pdfBuffer = fs.readFileSync(outputPath);
      // Có thể xóa file PDF tạm sau khi đọc buffer
      fs.unlinkSync(outputPath);
      resolve(pdfBuffer);
    });
  });
}
module.exports = {
  getInfoData,
  getSelectData,
  unGetSelectData,
  removeUndefinedObject,
  updateNestedObjectParser,
  convertToObjectIDMongo,
  docxToPdf,
};
