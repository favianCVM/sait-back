const models = require("../../models");
const { uploadImage } = require("../../utils/imageHandler");

module.exports = (req, res) => {
  const { files, fields: data } = req;
  
  return new Promise( async (resolve, reject) => {
    try {
      if (files.picture) {
        let imageRes = await uploadImage({
          folder: process.env.CLOUDINARY_ITEMS_FOLDER,
          picture: files.picture,
        });
        data.picture = imageRes.secure_url;
        data.pictureId = imageRes.public_id;
      }

      let registered_item_category = await models.itemCategories.create({
        ...data
      })

      return resolve(registered_item_category)
    } catch (error) {
      return reject(error)
    }
  })

}