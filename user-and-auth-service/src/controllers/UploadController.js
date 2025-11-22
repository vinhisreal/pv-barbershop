const UploadService = require("../services/upload");

class UploadController {
  async upload(req, res, next) {
    const result = await UploadService.uploadImageFromUrl();
    res.status(200).send(result);
  }

  async uploadThumb(req, res, next) {
    const {
      file,
      body: { folderName },
    } = req;
    if (!file) throw new Error("File missing");
    const result = await UploadService.uploadImageFromBuffer({
      buffer: req.file.buffer,
      folderName,
      name: req.file.originalname,
    });

    res.status(200).send(result);
  }
}

module.exports = new UploadController();
