const models = require("../../models");
const { uploadImage } = require("../../utils/imageHandler");

module.exports = (req, res) => {
  const { files, fields: data } = req;

  return new Promise(async (resolve, reject) => {
    try {
      let used_serial = await models.items.findOne({
        where: {
          serial: data.serial,
          item_category_id: data.item_category_id,
        },
      });

      if (used_serial)
        return res.status(400).json({
          message: "El serial se encuentra registrado.",
        });

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
