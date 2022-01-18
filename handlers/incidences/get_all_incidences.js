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
            include: [
              {
                model: models.errors,
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
        el.user = el.userIncidences[0]?.user?.dataValues || {};
        el.device = el.deviceIncidences[0]?.device?.dataValues || {};
        el.errors = el.incidenceErrors.map((il) => ({
          ...il.error.dataValues,
          priority: JSON.parse(il.error.priority),
        }));
        delete el.incidenceErrors;
        delete el.deviceIncidences;
        delete el.userIncidences;
        delete el.user.password;

        return el;
      });

      return resolve(output);
    } catch (err) {
      return reject(err);
    }
  });
};
