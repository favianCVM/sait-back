const models = require("../../models");

module.exports = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { technician_id } = req.params;
      const technician = await models.technicians.findOne({
        where: technician_id,
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

      return resolve(technician);
    } catch (err) {
      return reject(err);
    }
  });
};
