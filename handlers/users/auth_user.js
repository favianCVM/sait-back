const models = require("../../models");
const bcryptjs = require("bcryptjs");
const { createJWToken } = require("../../libs/auth");

module.exports = (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await models.users.findOne({
        raw:true,
        nest: true,
        where: {
          email: req.fields.email,
        },
        include: {
          model: models.technicians,
        },
      });

      if (!user)
        return res.status(400).json({
          message: "El email no existe.",
        });

      let passwordValid = await bcryptjs.compare(
        req.fields.password,
        user.password
      );

      if (!passwordValid)
        return res.status(400).json({
          message: "Credenciales invalidas.",
        });

      let token = createJWToken({
        sessionData: {
          ...user,
        },
      });

      return resolve({
        token,
        ...user,
      });
    } catch (err) {
      return reject(err);
    }
  });
};
