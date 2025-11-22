const FooterCollection = require("../models/FooterCollection");
const FooterImage = require("../models/FooterImage");

class FooterService {
  async createImage({ url, link, collection }) {
    return await FooterImage.create({ url, link, collection });
  }

  async createCollection({ title, description }) {
    return await FooterCollection.create({ title, description });
  }

  async getImages() {
    return await FooterImage.find().populate("collection").lean();
  }

  async getCollections() {
    return await FooterCollection.find().lean();
  }

  async setCollectionActive(collectionId, active) {
    const collection = await FooterCollection.findByIdAndUpdate(
      collectionId,
      { active },
      { new: true }
    );
    if (!collection) throw new Error("Collection not found");

    // cập nhật toàn bộ ảnh cùng collection
    await FooterImage.updateMany(
      { collection: collectionId },
      { active: active }
    );

    return collection;
  }

  async getImagesByCollection(collectionId) {
    return await FooterImage.find({ collection: collectionId })
      .populate("collection")
      .lean();
  }

  async setImageActive(imageId, active) {
    const image = await FooterImage.findByIdAndUpdate(
      imageId,
      { active },
      { new: true }
    );
    if (!image) throw new Error("Image not found");
    return image;
  }

  async getActiveFooterCollection() {
    // Lấy các collection đang active
    const activeCollections = await FooterCollection.find({
      active: true,
    }).lean();

    // Với mỗi collection, ta có thể kèm thêm danh sách ảnh của nó
    const result = await Promise.all(
      activeCollections.map(async (collection) => {
        const images = await FooterImage.find({
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

module.exports = new FooterService();
