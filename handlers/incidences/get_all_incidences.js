const models = require("../../models");

module.exports = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let incidences = await models.incidences.findAll({
        include: [
          {
            model: models.userIncidence,
            required: true,
            include: [
              {
                model: models.users,
                required: true,
              },
            ],
          },
          {
            model: models.incidenceError,
            required: true,
            include: [
              {
                model: models.errors,
                required: true,
              },
            ],
          },
          {
            model: models.types,
            required: true,
          },
        ],
      });

      let output = incidences.map((el) => {
        el = el.dataValues;
        el.user = el.userIncidences[0].user.dataValues;
        delete el.user.password;

        return el;
      });

      return resolve(output);
    } catch (err) {
      return reject(err);
    }
  });
};
