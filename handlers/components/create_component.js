const models = require("../../models");
const { uploadImage } = require("../../utils/imageHandler");

module.exports = (req, res) => {
  const { files, fields: data } = req;

  return new Promise( async (resolve, reject) => {
    try {

      if (files.picture) {
        let imageRes = await uploadImage({
          folder: process.env.CLOUDINARY_COMPONENTS_FOLDER,
          picture: files.picture,
        });
        data.picture = imageRes.secure_url;
        data.picture_id = imageRes.public_id;
      }

      let created_component = await models.components.create({
        ...data
      })

      return resolve(created_component)
    } catch (error) {
      return reject(error)
    }
  })

}