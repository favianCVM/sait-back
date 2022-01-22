const models = require("../../models");

module.exports = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let incidences = await models.incidences.findAll({
        include: [
          {
            model: models.deviceIncidence,
            include: {
              model: models.devices,
            },
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

      // let output = incidences.map((el) => {
      //   el = el.dataValues;
      //   el.device = el.deviceIncidences[0]?.device?.dataValues || {};
      //   el.errors = el.incidenceErrors.map((il) => (il.error.dataValues));
      //   delete el.incidenceErrors;
      //   delete el.deviceIncidences;

      //   return el;
      // });

      return resolve(incidences);
    } catch (err) {
      return reject(err);
    }
  });
};
