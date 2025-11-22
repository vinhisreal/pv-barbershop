const LookbookImage = require("../models/LookbookImage");
const LookbookCollection = require("../models/LookbookCollection");

class LookbookService {
  async createImage({ url, link, collection }) {
    return await LookbookImage.create({ url, link, collection });
  }

  async createCollection({ name, description }) {
    return await LookbookCollection.create({ name, description });
  }

  async getImages() {
    return await LookbookImage.find().populate("collection").lean();
  }

  async getCollections() {
    return await LookbookCollection.find().lean();
  }

  async setCollectionActive(collectionId, active) {
    const collection = await LookbookCollection.findByIdAndUpdate(
      collectionId,
      { active },
      { new: true }
    );
    if (!collection) throw new Error("Collection not found");

    // bật/tắt toàn bộ ảnh
    await LookbookImage.updateMany(
      { collection: collectionId },
      { active: active }
    );

    return collection;
  }

  async setImageActive(imageId, active) {
    const image = await LookbookImage.findByIdAndUpdate(
      imageId,
      { active },
      { new: true }
    );
    if (!image) throw new Error("Image not found");
    return image;
  }

  async getActiveLookbookCollection() {
    // Lấy các collection đang active
    const activeCollections = await LookbookCollection.find({
      active: true,
    }).lean();

    // Với mỗi collection, lấy danh sách ảnh active
    const result = await Promise.all(
      activeCollections.map(async (collection) => {
        const images = await LookbookImage.find({
          collection: collection._id,
          active: true,
        }).lean();

        return {
          ...collection,
          images,
        };
      })
    );

    return result;
  }
}

module.exports = new LookbookService();
