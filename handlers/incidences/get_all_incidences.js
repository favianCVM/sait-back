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
              model: models.deviceItem,
              include: {
                model: models.items,
                include: {
                  model: models.itemCategories,
                },
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
                include: {
                  model: models.itemCategories,
                },
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

        item.device.items = item.device.deviceItems.map((el) => ({
          ...el.item,
        }));

        item.errors = lodash.sortBy(
          item.errors.map((el) => ({
            ...el,
            items: el.errorItems.map((il) => ({ ...il.item })),
          })),
          (el) => el.id
        );

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
