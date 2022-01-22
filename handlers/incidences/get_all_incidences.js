const models = require("../../models");

module.exports = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let incidences = await models.incidences.findAll({
        include: [
          {
            model: models.devices,
            required: true
          },
          {
            model: models.users,
            required: true,
          },
          {
            model: models.incidenceError,
            include: [
              {
                model: models.errors,
              },
            ],
          },
        ],
      });

      return resolve(incidences);
    } catch (err) {
      return reject(err);
    }
  });
};
