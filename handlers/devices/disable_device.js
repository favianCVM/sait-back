const models = require("../../models");

module.exports = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let disabled_device = await models.devices.update(
        {
          disabled: data.disabled,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      return resolve(disabled_device);
    } catch (error) {
      console.error(error);
      return reject(error);
    }
  });
};
