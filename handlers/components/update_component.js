const models = require("../../models");
const {uploadImage} = require("../../utils/imageHandler")

module.exports = (req) => {
  const { files, fields: data } = req;
  return new Promise(async (resolve, reject) => {
    try {

      if (files.picture) {
        let imageRes = await uploadImage({
          folder: process.env.CLOUDINARY_COMPONENTS_FOLDER,
          picture: files.picture,
        });
        data.picture = imageRes.secure_url;
        data.picture_id = imageRes.public_id;
      }

      let updated_component = await models.components.update(
        { ...data },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      return resolve({updated_component});
    } catch (err) {
      return reject(err);
    }
  });
};
