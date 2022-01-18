const models = require("../../models");
const { uploadImage } = require("../../utils/imageHandler");

module.exports = (req) => {
  const { files, fields: data } = req;
  console.log(data)
  
  return new Promise(async (resolve, reject) => {
    try {
      if (JSON.parse(data.role) === 55 || data.role === "55")
        await models.technicians.create({
          user_id: data.id,
        });
      else
        await models.technicians.destroy({
          where: {
            user_id: data.id,
          },
        });

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

      return resolve({
        update_user,
        profile_picture_url: imageRes?.secure_url || null,
      });
    } catch (err) {
      return reject(err);
    }
  });
};
