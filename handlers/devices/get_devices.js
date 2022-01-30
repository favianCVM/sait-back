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
              },
            ],
          },
        ],
      });

      return resolve(devices);
    } catch (err) {
      return reject(err);
    }
  });
};
