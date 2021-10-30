const models = require("../../models");
const bcryptjs = require("bcryptjs");
const { createJWToken } = require("../../libs/auth");

module.exports = (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await models.profiles.findOne({
        where: {
          email: req.body.email,
        },
      });

      if (!user)
        return res.status(400).json({
          message: "El email no existe.",
        });

      user = user.dataValues;

      let passwordValid = await bcryptjs.compare(
        req.body.password,
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
