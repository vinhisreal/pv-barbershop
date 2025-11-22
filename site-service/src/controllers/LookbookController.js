const lookbookService = require("../services/lookbook");
const { SuccessResponse, CREATED } = require("../core/success-response");
const LookbookImage = require("../models/LookbookImage");

class LookbookController {
  async createImage(req, res) {
    new CREATED({
      message: "Lookbook image created",
      metadata: await lookbookService.createImage(req.body),
    }).send(res);
  }

  async createCollection(req, res) {
    new CREATED({
      message: "Lookbook collection created",
      metadata: await lookbookService.createCollection(req.body),
    }).send(res);
  }

  async getImages(req, res) {
    new SuccessResponse({
      message: "Lookbook images",
      metadata: await lookbookService.getImages(),
    }).send(res);
  }

  async getCollections(req, res) {
    new SuccessResponse({
      message: "Lookbook collections",
      metadata: await lookbookService.getCollections(),
    }).send(res);
  }

  async setCollectionActive(req, res) {
    new SuccessResponse({
      message: "Lookbook collection updated",
      metadata: await lookbookService.setCollectionActive(
        req.params.id,
        req.body.active
      ),
    }).send(res);
  }

  async setImageActive(req, res) {
    new SuccessResponse({
      message: "Lookbook image updated",
      metadata: await lookbookService.setImageActive(
        req.params.id,
        req.body.active
      ),
    }).send(res);
  }

  async getActiveCollection(req, res) {
    const data = await lookbookService.getActiveLookbookCollection();
    new SuccessResponse({
      message: "Active lookbook collection",
      metadata: data,
    }).send(res);
  }
}

module.exports = new LookbookController();
