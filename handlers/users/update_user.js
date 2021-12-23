const models = require("../../models");
const {uploadImage} = require("../../utils/imageHandler")

module.exports = (req) => {
  const { files, fields: data } = req;
  return new Promise(async (resolve, reject) => {
    try {

      let imageRes;
      if (files.profile_picture) {
        imageRes = await uploadImage({
          folder: process.env.CLOUDINARY_USERS_FOLDER,
          picture: files.profile_picture,
        });
        data.profile_picture = imageRes.secure_url;
        data.profile_picture_id = imageRes.public_id;
      }

      let update_user = await models.users.update(
        { ...data },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      return resolve({update_user, profile_picture_url: imageRes?.secure_url || null});
    } catch (err) {
      return reject(err);
    }
  });
};
