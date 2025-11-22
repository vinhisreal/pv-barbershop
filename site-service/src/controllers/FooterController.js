const footerService = require("../services/footer");
const { SuccessResponse, CREATED } = require("../core/success-response");

class FooterController {
  async createImage(req, res) {
    new CREATED({
      message: "Footer image created",
      metadata: await footerService.createImage(req.body),
    }).send(res);
  }

  async createCollection(req, res) {
    new CREATED({
      message: "Footer collection created",
      metadata: await footerService.createCollection(req.body),
    }).send(res);
  }

  async getImages(req, res) {
    new SuccessResponse({
      message: "Footer images",
      metadata: await footerService.getImages(),
    }).send(res);
  }

  async getCollections(req, res) {
    new SuccessResponse({
      message: "Footer collections",
      metadata: await footerService.getCollections(),
    }).send(res);
  }

  async setCollectionActive(req, res) {
    new SuccessResponse({
      message: "Footer collection updated",
      metadata: await footerService.setCollectionActive(
        req.params.id,
        req.body.active
      ),
    }).send(res);
  }

  async getImagesByCollection(req, res) {
    new SuccessResponse({
      message: "Images by collection",
      metadata: await footerService.getImagesByCollection(req.params.id),
    }).send(res);
  }

  async setImageActive(req, res) {
    new SuccessResponse({
      message: "Footer image updated",
      metadata: await footerService.setImageActive(
        req.params.id,
        req.body.active
      ),
    }).send(res);
  }

  async getActiveFooterCollection(req, res) {
    new SuccessResponse({
      message: "Active footer collections with images",
      metadata: await footerService.getActiveFooterCollection(),
    }).send(res);
  }
}

module.exports = new FooterController();
