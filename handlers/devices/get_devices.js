const models = require("../../models");

module.exports = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let devices = await models.devices.findAll({
        include: [
          {
            model: models.deviceTypes,
            required: true,
          },
          {
            model: models.deviceItem,
            include: [
              {
                model: models.items,
                include: {
                  model: models.itemCategories,
                },
              },
            ],
          },
        ],
      });

      const output = devices.reduce((acc, item) => {
        item = item.toJSON();

        item.items = item.deviceItems.map((el) => ({
          serial: el.item.serial,
          id: el.item.id,
          name: el.item.itemCategory.name,
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
