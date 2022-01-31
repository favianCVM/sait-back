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
              model: models.deviceItem,
              include: {
                model: models.items,
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
              model: models.errorItem,
              include: {
                model: models.items,
              },
            },
          },
        ],
      });

      const output = incidences.reduce((acc, item) => {
        item = item.toJSON();

        item.device.items = item.device.deviceItems.map((el) => ({
          ...el.component,
        }));

        item.errors = item.errors.map((el) => ({
          ...el,
          items: el.errorItems.map((il) => ({ ...il.item })),
        }));

        acc.push(item);
        return acc;
      }, []);

      return resolve(output);
    } catch (error) {
      console.error(error);
      return reject(error);
    }
  });
};
