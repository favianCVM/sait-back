const models = require("../../models");

module.exports = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let items = await models.itemCategories.findAll({
        include: {
          model: models.items,
          include: {
            model: models.deviceItem,
            include: {
              model: models.devices,
              include: {
                model: models.deviceTypes,
              },
            },
          },
        },
      });

      const output = items.reduce((acc, item) => {
        item = item.toJSON();

        item.items = item.items.map((el) => ({
          ...el,
          device: el.deviceItems[0]?.device,
        }));

        acc.push(item);
        return acc;
      }, []);

      return resolve(output);
    } catch (err) {
      console.error(err);
      return reject(err);
    }
  });
};
