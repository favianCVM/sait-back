const models = require("../../models");

module.exports = (req) => {
  return new Promise(async (resolve, reject) => {
    const { id: user_id } = req.params;
    try {
      const technician = await models.technicians.findOne({
        raw: true,
        nest: true,
        where: {
          user_id,
        },
      });

      const incidences = await models.incidences.findAll({
        include: [
          {
            model: models.devices,
            required: true,
            include: {
              model: models.deviceComponent,
              include: {
                model: models.components,
              },
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
          {
            model: models.technicianIncidence,
            where: {
              technician_id: technician.id,
            },
            include: {
              model: models.technicians,
              include: {
                model: models.users,
              },
            },
          },
        ],
      });

      const output = incidences.reduce((acc, item) => {
        item = item.toJSON();

        item.device.components = item.device.deviceComponents.map((el) => ({
          ...el.component,
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
