const models = require("../../models");

module.exports = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let devices = await models.devices.findAll({
        include: [
          {
            model: models.users,
            required: true,
          },
          {
            model: models.deviceComponent,
            required: true,
            include: {
              model: models.components,
              required: true,
            },
          },
        ],
      });

      return resolve(devices);
    } catch (err) {
      return reject(err);
    }
  });
};
