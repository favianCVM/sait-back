const models = require("../../models");

module.exports = (req) => {
  return new Promise(async (resolve, reject) => {
    const { id } = req.params;
    try {
      const incidences = await models.incidences.findAll({
        where: {
          user_id: id,
        },
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
        ],
      });

      const output = incidences.reduce((acc, item) => {
        item = item.toJSON();

        item.device.components = item.device.deviceComponents.map((el) => ({
          ...el.component,
        }));

        item.errors = item.errors.map((el) => ({
          ...el,
          components: el.errorComponents.map((il) => ({ ...il.component })),
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
