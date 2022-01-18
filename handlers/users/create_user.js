const models = require("../../models");
const bcrypt = require("bcryptjs");
const { uploadImage } = require("../../utils/imageHandler");

module.exports = async (req) => {
  const { files, fields: data } = req;

  return new Promise(async (resolve, reject) => {
    try {
      let usedDni = await models.users.findOne({
        where: {
          dni: data.dni,
        },
      });

      if (usedDni)
        return reject({
          status: 400,
          message: "Este dni se encuentra en uso.",
        });

      let usedEmail = await models.users.findOne({
        where: {
          email: data.email,
        },
      });

      if (usedEmail)
        return reject({
          status: 400,
          message: "Este email se encuentra en uso.",
        });

      let salt = await bcrypt.genSalt(15);
      let hashedPass = await bcrypt.hash(data.password, salt);

      data.password = hashedPass;

      let imageRes;
      if (files.profile_picture) {
        imageRes = await uploadImage({
          folder: process.env.CLOUDINARY_USERS_FOLDER,
          picture: files.profile_picture,
        });
        data.profile_picture = imageRes.secure_url;
        data.profile_picture_id = imageRes.public_id;
      }
     
      let created_user = await models.users.create({ ...data });

      if(JSON.parse(data.role) === 55 || data.role === "55"){
        let created_technician = models.technicians.create({
          user_id: created_user.dataValues.id
        })
      }

      return resolve(created_user);
    } catch (err) {
      return reject(err);
    }
  });
};
