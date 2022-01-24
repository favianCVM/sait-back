const models = require("../../models");
const lodash = require("lodash");
module.exports = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let incidences = await models.incidences.findAll({
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
            model: models.errors,
            include: {
              model: models.errorComponent,
              include: {
                model: models.components,
              },
            },
          },
          {
            model: models.technicianIncidence,
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
        item.technicians = item.technicianIncidences.map((el) => ({
          ...el.technician,
        }));

        item.device.components = item.device.deviceComponents.map((el) => ({
          ...el.component,
        }));

        item.errors = lodash.sortBy(
          item.errors.map((el) => ({
            ...el,
            components: el.errorComponents.map((il) => ({ ...il.component })),
          })),
          (el) => el.id
        );

        acc.push(item);
        return acc;
      }, []);

      return resolve(output);
    } catch (err) {
      return reject(err);
    }
  });
};
