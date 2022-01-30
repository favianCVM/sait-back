const models = require("../../models");
const { uploadImage } = require("../../utils/imageHandler");

module.exports = (req, res) => {
  const { files, fields: data } = req;

  return new Promise(async (resolve, reject) => {
    try {
      if (data.item_category_id === "new") {
        await models.itemCategories.create(
          {
            ...data.item_category,
          },
          {
            raw: true,
            nested: true,
          }
        );
      }
      let registered_item = await models.items.create({
        ...data,
      });

      return resolve(registered_item);
    } catch (error) {
      console.error(error);
      return reject(error);
    }
  });
};
