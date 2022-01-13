const models = require("../../models");

module.exports = (req, res) => {
  const { files, fields: data } = req;
  console.log("DATA: ", data);

  return new Promise(async (resolve, reject) => {
    try {
      let created_device = await models.devices.create({
        ...data,
      });

      let created_deviceComponent =
        await models.deviceComponent.bulkCreate(
          JSON.parse(data.components).map((el) => ({
            component_id: el,
            device_id: created_device.dataValues.id,
          }))
        );

      return resolve({ ...created_device, created_deviceComponent });
    } catch (error) {
      return reject(error);
    }
  });
};
