const models = require("../../models");

module.exports = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      const incidence = await models.incidences.findOne({
        where: {
          id: req.params.id,
        },
        include: [
          {
            model: models.users,
            required: true,
          },
          {
            model: models.devices,
            include: {
              model: models.deviceComponent,
              include: {
                model: models.components,
              },
            },
          },
        ],
      });

      let output = incidence.toJSON();

      if (
        Array.isArray(output.device?.deviceComponents) &&
        output.device?.deviceComponents.length
      )
        output.device.components = incidence.device.deviceComponents.map(
          (el) => {
            return {
              ...el.component.toJSON(),
            };
          }
        );
      delete output.device.deviceComponents;

      return resolve(output);
    } catch (err) {
      return reject(err);
    }
  });
};
