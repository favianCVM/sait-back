const models = require("../../models");

module.exports = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let incidences = await models.userIncidence.findAll({
        where: {
          userId: req.user.id,
        },
        include: [
          {
            model: models.users,
            required: true,
          },
        ],
      });

      return resolve(incidences);
    } catch (err) {
      return reject(err);
    }
  });
};
