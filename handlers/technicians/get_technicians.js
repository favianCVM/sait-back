const models = require("../../models");

module.exports = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let technicians = await models.technicians.findAll({
        include: [
          {
            model: models.users,
            required: true,
          },
          {
            model: models.technicianIncidence,
            include: {
              model: models.incidences,
            },
          },
        ],
      });

      const output = technicians.reduce((acc, item) => {
        item = item.toJSON();

        item.incidences = item.technicianIncidences.map((el) => ({
          ...el.incidence,
        }));

        acc.push(item);
        return acc;
      }, []);

      return resolve(output);
    } catch (err) {
      return reject(err);
    }
  });
};
